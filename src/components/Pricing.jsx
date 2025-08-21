import { Check, Star, Zap, Users, Building2, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  const plans = [
    {
      name: "Focused Beam",
      description: "Free personal automation discovery",
      price: "Free",
      period: "",
      teamSize: "Individual users",
      comparison: "Not Available from Consulting Firms",
      features: [
        "AI-powered automation opportunity discovery",
        "Personal process analysis",
        "Task automation identification",
        "ROI calculations for identified opportunities",
        "Basic improvement recommendations",
        "24/7 AI availability",
        "Optional consultant matching"
      ],
      icon: Users,
      popular: false,
      buttonText: "Start Free Assessment"
    },
    {
      name: "Scoped Spectrum",
      description: "Per-seat automation intelligence",
      price: "$20",
      period: "/month per seat",
      teamSize: "Teams of any size",
      comparison: "$50K - $500K+ per consulting engagement",
      features: [
        "Everything in Focused Beam",
        "Organizational assessment report",
        "Clearly defined action items across team",
        "Cross-functional process mapping",
        "Advanced ROI modeling",
        "Implementation priority matrix",
        "Progress tracking dashboard",
        "Email support",
        "Monthly usage reports",
        "Priority consultant matching (coming soon)",
        "Engineer & org consultant network access (coming soon)"
      ],
      icon: Building2,
      popular: true,
      buttonText: "Get Started"
    },
    {
      name: "Full Spectrum",
      description: "Full organizational transformation",
      price: "Contact",
      period: "for pricing",
      teamSize: "Large organizations",
      comparison: "$1M - $5M+ per consulting engagement",
      features: [
        "Everything in Scoped Spectrum",
        "Enterprise-wide automation strategy",
        "Multi-department coordination analysis",
        "Advanced change management planning",
        "C-suite presentation materials",
        "Dedicated success manager",
        "Custom integration support",
        "SLA guarantees",
        "Dedicated consultant team",
        "Technical & organizational specialists"
      ],
      icon: Star,
      popular: false,
      buttonText: "Contact Sales"
    },
  ]

  return (
    <section id="pricing" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Automation ROI Discovery Made Simple
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Personal Assessments.
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              $20/month Per Seat Teams.
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free with personal automation discovery. Scale to team collaboration at $20/month per seat.
            Enterprise and white-label solutions available with custom pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <div 
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                } p-8 transition-transform duration-300 hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{plan.teamSize}</p>
                  <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
                    vs. {plan.comparison}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700' 
                      : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Real Investment Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Solution Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-red-600">Traditional Approach</th>
                  <th className="text-left py-4 px-4 font-semibold text-primary-600">Prismscope</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">Personal Assessment</td>
                  <td className="py-4 px-4 text-red-600">Not Available</td>
                  <td className="py-4 px-4 text-primary-600 font-semibold">Free</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">Team Collaboration (10 people)</td>
                  <td className="py-4 px-4 text-red-600">$50K - $200K+ per engagement</td>
                  <td className="py-4 px-4 text-primary-600 font-semibold">$200/month ($20 per seat)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">Mid-size Team (50 people)</td>
                  <td className="py-4 px-4 text-red-600">$200K - $1M+ per engagement</td>
                  <td className="py-4 px-4 text-primary-600 font-semibold">$1,000/month ($20 per seat)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">Enterprise Solution</td>
                  <td className="py-4 px-4 text-red-600">$1M - $5M+ per engagement</td>
                  <td className="py-4 px-4 text-primary-600 font-semibold">Custom pricing</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">White Label Platform</td>
                  <td className="py-4 px-4 text-red-600">$2M+ to build in-house</td>
                  <td className="py-4 px-4 text-primary-600 font-semibold">Revenue sharing model</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Example Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              See Results
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              Discover how organizations like yours are identifying automation opportunities.
              Review actual assessment reports and ROI calculations.
            </p>
            <Link 
              to="/example-report" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              See Example Report
            </Link>
          </div>
        </div>

        {/* Elite Consulting Results Section */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 mt-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4 mr-2" />
              Elite Consulting Results at AI Speed & Scale
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Insights to Implementation—
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                With Pre-Vetted Experts
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Complete surveys and build AI roadmaps on our platform, then get matched with AI consultants 
              who turn insights into action plans with cost estimates showcasing exceptional ROI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-2">Technical Implementation</h5>
                <p className="text-gray-600">Engineers and automation specialists for technical solutions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-2">Organizational Improvement</h5>
                <p className="text-gray-600">Process and change management consultants for operational excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* White Label Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 mt-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              White Label Options Available
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              We can offer white label solutions for consulting firms and agencies looking to provide 
              AI-powered automation discovery under their own brand.
            </p>
            <a href="#contact" className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200">
              Contact Us for More Details
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Pricing