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
            Become a Prismscope
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              AI Consultant
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join our network of pre-vetted AI and organizational transformation experts. 
            Help organizations implement automation solutions while earning significant revenue 
            from high-value consulting engagements.
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
              Strategic partnerships that create mutual value through service reselling and solution recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">One-Time Vetting Fee</h4>
              <div className="text-3xl font-bold text-primary-600 mb-2">$99</div>
              <p className="text-sm text-gray-600">
                Covers background verification, portfolio review, and network onboarding
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center border-2 border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Channel Partner</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">Revenue Share</div>
              <p className="text-sm text-gray-600">
                Earn commissions by recommending tools and products to clients
              </p>
            </div>
          </div>
        </div>

        {/* Channel Partner Program */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Strategic Channel Partner Program</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Join our ecosystem where technology partners and solution providers work together. 
              Partners resell Prismscope services while we recommend their products and implementation services to clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Resell Prismscope Services</h4>
              <p className="text-gray-600 text-sm">
                White-label and resell our automation discovery platform to your clients with attractive margins and ongoing support.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution Recommendations</h4>
              <p className="text-gray-600 text-sm">
                We recommend your products and implementation services to clients when they align with identified automation opportunities.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Mutual Revenue Growth</h4>
              <p className="text-gray-600 text-sm">
                Bi-directional revenue sharing: earn from Prismscope resales while we drive implementation business to you.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-blue-700 bg-blue-100 rounded-lg p-4 max-w-3xl mx-auto">
              <strong>Strategic Partnership:</strong> We're looking for technology vendors, system integrators, 
              and solution providers who want to both leverage and complement our automation discovery platform.
            </p>
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