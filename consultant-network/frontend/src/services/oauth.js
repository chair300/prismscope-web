// OAuth Service Configuration
// Handles OAuth authentication for LinkedIn, Google, Microsoft, and GitHub

const oauthConfig = {
  linkedin: {
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    clientSecret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    scope: 'r_liteprofile r_emailaddress',
    profileUrl: 'https://api.linkedin.com/v2/me',
    emailUrl: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))'
  },
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'openid profile email',
    profileUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
  },
  microsoft: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
    clientSecret: import.meta.env.VITE_MICROSOFT_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_MICROSOFT_REDIRECT_URI,
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scope: 'openid profile email User.Read',
    profileUrl: 'https://graph.microsoft.com/v1.0/me'
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scope: 'read:user user:email',
    profileUrl: 'https://api.github.com/user',
    emailUrl: 'https://api.github.com/user/emails'
  }
}

// Generate OAuth authorization URL
export const getOAuthUrl = (provider) => {
  const config = oauthConfig[provider]
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`)
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    response_type: 'code',
    state: generateState(provider)
  })

  // Add provider-specific parameters
  if (provider === 'google') {
    params.append('access_type', 'offline')
    params.append('prompt', 'consent')
  } else if (provider === 'microsoft') {
    params.append('response_mode', 'query')
  }

  return `${config.authUrl}?${params.toString()}`
}

// Generate a random state parameter for OAuth security
const generateState = (provider) => {
  const state = Math.random().toString(36).substring(2, 15)
  // Store state in sessionStorage for verification
  sessionStorage.setItem(`oauth_state_${provider}`, state)
  return state
}

// Verify OAuth state parameter
export const verifyState = (provider, state) => {
  const storedState = sessionStorage.getItem(`oauth_state_${provider}`)
  sessionStorage.removeItem(`oauth_state_${provider}`)
  return storedState === state
}

// Exchange authorization code for access token
export const exchangeCodeForToken = async (provider, code) => {
  const config = oauthConfig[provider]
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`)
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: code,
    redirect_uri: config.redirectUri,
    grant_type: 'authorization_code'
  })

  try {
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString()
    })

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error(`OAuth token exchange error for ${provider}:`, error)
    throw error
  }
}

// Fetch user profile from OAuth provider
export const fetchUserProfile = async (provider, accessToken) => {
  const config = oauthConfig[provider]
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`)
  }

  try {
    // Fetch basic profile
    const profileResponse = await fetch(config.profileUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    })

    if (!profileResponse.ok) {
      throw new Error(`Profile fetch failed: ${profileResponse.statusText}`)
    }

    const profile = await profileResponse.json()

    // Fetch additional data if needed
    let email = null
    if (provider === 'linkedin' && config.emailUrl) {
      const emailResponse = await fetch(config.emailUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })
      if (emailResponse.ok) {
        const emailData = await emailResponse.json()
        email = emailData.elements?.[0]?.['handle~']?.emailAddress
      }
    } else if (provider === 'github' && config.emailUrl) {
      const emailResponse = await fetch(config.emailUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })
      if (emailResponse.ok) {
        const emails = await emailResponse.json()
        const primaryEmail = emails.find(e => e.primary)
        email = primaryEmail?.email
      }
    }

    // Map provider-specific data to common format
    return mapProfileData(provider, profile, email)
  } catch (error) {
    console.error(`Profile fetch error for ${provider}:`, error)
    throw error
  }
}

// Map OAuth provider data to common format
const mapProfileData = (provider, profile, additionalEmail = null) => {
  const mappedData = {}

  switch (provider) {
    case 'linkedin':
      mappedData.firstName = profile.localizedFirstName || profile.firstName?.localized?.en_US || ''
      mappedData.lastName = profile.localizedLastName || profile.lastName?.localized?.en_US || ''
      mappedData.email = additionalEmail || ''
      mappedData.linkedIn = profile.vanityName ? `https://linkedin.com/in/${profile.vanityName}` : ''
      mappedData.profilePicture = profile.profilePicture?.displayImage || ''
      break

    case 'google':
      mappedData.firstName = profile.given_name || ''
      mappedData.lastName = profile.family_name || ''
      mappedData.email = profile.email || ''
      mappedData.profilePicture = profile.picture || ''
      break

    case 'microsoft':
      mappedData.firstName = profile.givenName || ''
      mappedData.lastName = profile.surname || ''
      mappedData.email = profile.mail || profile.userPrincipalName || ''
      mappedData.company = profile.companyName || ''
      mappedData.profilePicture = ''
      break

    case 'github':
      const nameParts = (profile.name || '').split(' ')
      mappedData.firstName = nameParts[0] || ''
      mappedData.lastName = nameParts.slice(1).join(' ') || ''
      mappedData.email = additionalEmail || profile.email || ''
      mappedData.github = profile.html_url || ''
      mappedData.website = profile.blog || ''
      mappedData.company = profile.company || ''
      mappedData.profilePicture = profile.avatar_url || ''
      break

    default:
      break
  }

  return mappedData
}

// Handle OAuth callback
export const handleOAuthCallback = async (provider) => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const error = urlParams.get('error')

  if (error) {
    throw new Error(`OAuth error: ${error}`)
  }

  if (!code) {
    throw new Error('No authorization code received')
  }

  // Verify state for security
  if (!verifyState(provider, state)) {
    throw new Error('Invalid state parameter - possible CSRF attack')
  }

  try {
    // Exchange code for token
    const accessToken = await exchangeCodeForToken(provider, code)
    
    // Fetch user profile
    const userProfile = await fetchUserProfile(provider, accessToken)
    
    return userProfile
  } catch (error) {
    console.error('OAuth callback error:', error)
    throw error
  }
}

// Check if we're on an OAuth callback page
export const isOAuthCallback = () => {
  const path = window.location.pathname
  return path.includes('/auth/') && path.includes('/callback')
}

// Get provider from callback URL
export const getProviderFromCallback = () => {
  const path = window.location.pathname
  const match = path.match(/\/auth\/(\w+)\/callback/)
  return match ? match[1] : null
}

export default {
  getOAuthUrl,
  handleOAuthCallback,
  isOAuthCallback,
  getProviderFromCallback
}