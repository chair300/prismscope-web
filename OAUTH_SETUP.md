# OAuth Setup Guide

This guide explains how to set up OAuth applications for each provider and configure the environment variables.

## 1. LinkedIn OAuth Setup

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click "Create App"
3. Fill in app details:
   - App name: "Prismscope Consultant Network"
   - LinkedIn Page: Your company page (required)
   - App logo: Upload your logo
4. In the "Auth" tab:
   - Add redirect URL: `http://localhost:8080/auth/linkedin/callback`
   - For production: `https://yourdomain.com/auth/linkedin/callback`
   - Request scopes: `r_liteprofile`, `r_emailaddress`
5. Copy Client ID and Client Secret to your .env file

## 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Enable Google+ API and Google OAuth2 API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Name: "Prismscope Consultant Network"
   - Authorized redirect URIs: 
     - `http://localhost:8080/auth/google/callback`
     - `https://yourdomain.com/auth/google/callback` (production)
5. Copy Client ID and Client Secret to your .env file

## 3. Microsoft OAuth Setup

1. Go to [Azure App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps)
2. Click "New registration"
3. Fill in details:
   - Name: "Prismscope Consultant Network"
   - Supported account types: Accounts in any organizational directory and personal Microsoft accounts
   - Redirect URI: Web - `http://localhost:8080/auth/microsoft/callback`
4. In "Certificates & secrets", create a new client secret
5. In "API permissions", add Microsoft Graph permissions:
   - User.Read
   - profile
   - openid
   - email
6. Copy Application (client) ID and Client Secret to your .env file

## 4. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - Application name: "Prismscope Consultant Network"
   - Homepage URL: `http://localhost:8080` (or your production URL)
   - Authorization callback URL: `http://localhost:8080/auth/github/callback`
4. Copy Client ID and Client Secret to your .env file

## Environment Variables

After setting up all OAuth apps, update your `.env` file:

```env
# LinkedIn OAuth
VITE_LINKEDIN_CLIENT_ID=your_actual_linkedin_client_id
VITE_LINKEDIN_CLIENT_SECRET=your_actual_linkedin_client_secret
VITE_LINKEDIN_REDIRECT_URI=http://localhost:8080/auth/linkedin/callback

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
VITE_GOOGLE_REDIRECT_URI=http://localhost:8080/auth/google/callback

# Microsoft OAuth
VITE_MICROSOFT_CLIENT_ID=your_actual_microsoft_client_id
VITE_MICROSOFT_CLIENT_SECRET=your_actual_microsoft_client_secret
VITE_MICROSOFT_REDIRECT_URI=http://localhost:8080/auth/microsoft/callback

# GitHub OAuth
VITE_GITHUB_CLIENT_ID=your_actual_github_client_id
VITE_GITHUB_CLIENT_SECRET=your_actual_github_client_secret
VITE_GITHUB_REDIRECT_URI=http://localhost:8080/auth/github/callback
```

## Testing OAuth

1. Start your development server: `npm run dev`
2. Navigate to the consultant network page
3. Click "Apply to Join Network"
4. Try each OAuth provider button
5. You should be redirected to the provider's OAuth page
6. After authorization, you'll be redirected back with user data

## Production Deployment

For production:
1. Update all redirect URIs to your production domain
2. Update the `.env` file with production URLs
3. Ensure HTTPS is enabled for all OAuth redirects
4. Test all OAuth flows in production environment

## Security Notes

- Never commit `.env` files to version control
- Client secrets should be kept secure
- Use HTTPS in production
- Validate the `state` parameter to prevent CSRF attacks
- The OAuth service includes state validation automatically

## Common Issues

1. **Invalid redirect URI**: Ensure the redirect URI matches exactly in your OAuth app settings
2. **CORS errors**: Make sure your domain is authorized in the OAuth app settings
3. **Missing scopes**: Verify you've requested the correct permissions for each provider
4. **State mismatch**: Clear browser storage if you encounter state validation errors