import { useState } from 'react'
import { Users, Briefcase } from 'lucide-react'
import ExpertNetworkForm from './ExpertNetworkForm'
import StrategicPartnerForm from './StrategicPartnerForm'

const ConsultantNetworkForm = () => {
  const [activeTab, setActiveTab] = useState('expert')

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Join Our Partner Network
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apply to Partner with Prismscope
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of elite AI and organizational transformation experts. 
            Help organizations implement automation solutions and drive meaningful change.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1 max-w-lg mx-auto mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('expert')}
            className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${
              activeTab === 'expert'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Expert Network
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('strategic')}
            className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${
              activeTab === 'strategic'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Strategic Partner
          </button>
        </div>

        {/* Partnership Type Description */}
        <div className="mb-8 text-center">
          {activeTab === 'expert' ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2 text-lg">Expert Consultant Network</h3>
              <p className="text-blue-700">
                For individual consultants and specialized firms. Get pre-qualified leads with completed assessments, 
                clear project scope, and premium project fees. Choose from two tracks: Builders/Engineers or 
                Organizational Experts.
              </p>
              <div className="mt-4 text-sm text-blue-600">
                <strong>One-time $99 vetting fee</strong> - Background verification, portfolio review, and network onboarding
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2 text-lg">Strategic Partner Program</h3>
              <p className="text-green-700">
                For technology vendors, system integrators, and solution providers. Bi-directional revenue model 
                with white-label opportunities, qualified referrals, product recommendations, and co-marketing support.
              </p>
              <div className="mt-4 text-sm text-green-600">
                <strong>Includes client tracking keys</strong> for white-label services and revenue attribution
              </div>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'expert' ? (
            <ExpertNetworkForm />
          ) : (
            <StrategicPartnerForm />
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Note:</strong> After submitting your application, you will receive an invitation 
            to complete the full onboarding process within 2-3 business days. 
            We carefully review all applications to maintain the quality of our network.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConsultantNetworkForm