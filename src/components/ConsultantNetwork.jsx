import { Users, Zap, DollarSign, Briefcase, CheckCircle, Star } from 'lucide-react'
import ConsultantNetworkForm from './ConsultantNetworkForm'

const ConsultantNetwork = () => {
  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: '80px' }}>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Join Our Expert Network
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partner with Prismscope
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Two Ways to Collaborate
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join our network of elite AI and organizational transformation experts. 
            Help organizations implement automation solutions and drive meaningful change.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">High-Value Projects</h3>
            <p className="text-gray-600">
              Work on automation projects worth $50K-$500K+ with clear ROI outcomes 
              and measurable business impact.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pre-Qualified Clients</h3>
            <p className="text-gray-600">
              Clients come to you with completed assessments, identified opportunities, 
              and budgets already allocated for implementation.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Network</h3>
            <p className="text-gray-600">
              Join an exclusive network of vetted consultants with proven track records 
              in AI implementation and organizational transformation.
            </p>
          </div>
        </div>

        {/* Partnership Models */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Models</h2>
            <p className="text-lg text-gray-600">
              Two distinct pathways to join the Prismscope ecosystem and drive mutual growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Expert Consultant Network */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Expert Consultant Network</h3>
                <p className="text-gray-600">For individual consultants and specialized firms</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Two Specialized Tracks:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 text-sm">Builders/Engineers</h5>
                    </div>
                    <p className="text-xs text-gray-600">Technical implementation specialists, AI/ML engineers, automation developers</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 text-sm">Organizational Experts</h5>
                    </div>
                    <p className="text-xs text-gray-600">Traditional consultants, change management, process optimization specialists</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What You Get:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Pre-qualified leads with completed organizational assessments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Clear project scope, ROI calculations, and implementation roadmaps</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Premium project fees reflecting the high-value nature of AI implementations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Ongoing support and resources from the Prismscope team</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center bg-primary-50 rounded-lg p-4">
                <p className="text-primary-800 font-semibold">One-time $99 vetting fee</p>
                <p className="text-primary-600 text-sm">Background verification, portfolio review, and network onboarding</p>
              </div>
            </div>

            {/* Strategic Channel Partner Program */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-blue-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Strategic Partner Program</h3>
                <p className="text-gray-600">For technology vendors, system integrators, and solution providers</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Bi-Directional Revenue Model:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Resell Prismscope Services:</strong> White-label our automation discovery platform with attractive margins and unique client tracking keys</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Receive Qualified Referrals:</strong> We recommend your products and services when they align with client needs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Mutual Growth:</strong> Earn from Prismscope resales while we drive implementation business to you</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Product Recommendations:</strong> We recommend your solutions when they match identified client needs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Co-Marketing:</strong> Joint go-to-market strategies and collaborative sales efforts</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Ideal Partners:</h5>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Technology vendors with complementary automation tools</li>
                  <li>• System integrators seeking differentiated service offerings</li>
                  <li>• Solution providers looking to expand their AI capabilities</li>
                  <li>• AI/ML platforms and automation tool providers</li>
                  <li>• Data analytics and business intelligence solutions</li>
                  <li>• Workflow automation and process optimization software vendors</li>
                  <li>• Industry-specific AI application providers</li>
                </ul>
              </div>
            </div>

          </div>
        </div>


        {/* What We're Looking For */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What We're Looking For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                Technical Experts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Machine Learning/AI Engineers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">RPA and Workflow Automation Specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Data Scientists with Implementation Experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Software Engineers with AI/ML Focus</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Cloud AI Platform Specialists</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-accent-600" />
                Organizational Experts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">AI Strategy Consultants</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Change Management Specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Process Optimization Experts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Digital Transformation Leaders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Business Analysis Professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <ConsultantNetworkForm />

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-blue-800">
              <strong>Ready to join?</strong> Fill out the application above and expect an invitation 
              to complete the full consultant onboarding process within 2-3 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantNetwork