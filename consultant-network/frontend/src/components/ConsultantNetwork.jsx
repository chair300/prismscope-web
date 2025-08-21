import { useState } from 'react'
import { CheckCircle, Users, DollarSign, Briefcase, Award, TrendingUp, ArrowRight, Shield, Lock } from 'lucide-react'
import ConsultantSignupModal from './ConsultantSignupModal'

const ConsultantNetwork = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const requirements = [
    {
      title: "AI & Automation Expertise",
      description: "Deep understanding of AI technologies including ML, GenAI, RPA, and workflow automation"
    },
    {
      title: "Implementation Experience",
      description: "Proven track record of successful AI/automation project delivery with measurable ROI"
    },
    {
      title: "Industry Knowledge",
      description: "Domain expertise in specific industries (healthcare, finance, retail, manufacturing, etc.)"
    },
    {
      title: "Technical Proficiency",
      description: "Hands-on experience with leading AI platforms and tools (OpenAI, Azure AI, AWS ML, etc.)"
    },
    {
      title: "Consulting Excellence",
      description: "Strong communication skills and ability to translate technical solutions into business value"
    },
    {
      title: "Continuous Learning",
      description: "Commitment to staying current with rapidly evolving AI technologies and best practices"
    }
  ]

  const benefits = [
    {
      icon: Users,
      title: "Qualified Leads",
      description: "Access pre-qualified clients with identified AI opportunities and budget allocation"
    },
    {
      icon: TrendingUp,
      title: "Higher Value Projects",
      description: "Focus on strategic AI implementations with clear ROI, not exploratory conversations"
    },
    {
      icon: Briefcase,
      title: "Complete Project Context",
      description: "Receive detailed discovery reports with pain points, requirements, and success metrics"
    },
    {
      icon: Lock,
      title: "Secure Escrow Payments",
      description: "Protected payments through escrow with 15% released upfront to start work"
    },
    {
      icon: Shield,
      title: "Platform Support",
      description: "Leverage Prismscope's methodology and tools to accelerate project delivery"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                AI Consultant Network
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Join the premier network of AI implementation specialists delivering measurable ROI through Prismscope's qualified opportunities
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in Registering? Join Today!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Partner with Prismscope to access high-value AI implementation opportunities from organizations ready to invest in automation
              </p>
              <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Fees</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-primary-600 mr-2" />
                      <span className="font-semibold text-gray-900">Vetting Fee</span>
                    </div>
                    <p className="text-2xl font-bold text-primary-600 mb-1">$99</p>
                    <p className="text-sm text-gray-600">Per individual consultant (one-time)</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-6 h-6 text-accent-600 mr-2" />
                      <span className="font-semibold text-gray-900">Matching Fee</span>
                    </div>
                    <p className="text-2xl font-bold text-accent-600 mb-1">15-40%</p>
                    <p className="text-sm text-gray-600">Variable based on project scope & complexity</p>
                  </div>
                </div>
              </div>
              
              {/* Escrow Protection Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <Lock className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Escrow Payment Protection</h3>
                    <p className="text-gray-700 mb-3">
                      Your payments are protected through our escrow system, ensuring both consultants and clients are secure throughout the project lifecycle.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Client funds held securely in escrow upon project agreement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span><strong>15% released upfront</strong> to consultant to begin work</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Milestone-based payments released after client verification of deliverables</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Dispute resolution support to protect both parties</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <button 
                className="btn-primary text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Apply to Join Network
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Consultant Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain high standards to ensure our clients receive exceptional AI implementation expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{req.title}</h3>
                    <p className="text-gray-600">{req.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Join Our Network?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access premium opportunities with clients who have completed comprehensive AI discovery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-3 mr-4">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple process from registration to project delivery
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Register & Get Verified",
                  description: "Complete application, pay $99 vetting fee, and undergo verification of credentials and expertise"
                },
                {
                  step: "2",
                  title: "Receive Matched Opportunities",
                  description: "Get notified of qualified leads matching your expertise, complete with AI discovery reports and ROI analysis"
                },
                {
                  step: "3",
                  title: "Submit Proposals & Secure Agreement",
                  description: "Review requirements, submit proposals, and upon client agreement, funds are secured in escrow account"
                },
                {
                  step: "4",
                  title: "Start Work with 15% Upfront",
                  description: "Receive 15% of project funds immediately upon agreement to begin implementation work"
                },
                {
                  step: "5",
                  title: "Deliver Milestones & Get Paid",
                  description: "Complete project milestones, get client verification, and receive remaining payments released from escrow"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Focus on What You Do Best: Implementation
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let Prismscope handle discovery, qualification, and ROI analysis. You focus on delivering exceptional AI solutions.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-sm opacity-90">Less time on discovery</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">3x</div>
                <div className="text-sm opacity-90">Higher close rates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">60-85%</div>
                <div className="text-sm opacity-90">Revenue retention</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Join Elite AI Consultants?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Apply today and start accessing high-value AI implementation opportunities with pre-qualified, ready-to-invest organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-primary text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Apply Now - $99
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="btn-secondary text-lg">
                Download Network Guide
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Vetting fee: $99 per consultant | Matching fee: 15-40% based on project complexity
            </p>
          </div>
        </div>
      </section>
      {/* Signup Modal */}
      <ConsultantSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default ConsultantNetwork