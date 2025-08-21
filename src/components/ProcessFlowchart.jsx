import { Users, Brain, UserCheck, TrendingUp, ArrowRight } from 'lucide-react'

const ProcessFlowchart = () => {
  const steps = [
    {
      icon: Users,
      title: "Individual Assessments",
      description: "Patented chat surveys assess each individual across your entire organization",
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Brain,
      title: "AI Roadmap, ROI focused",
      description: "ML technology identifies high-value use cases and creates your organizational AI roadmap with implementation plan and ROI calculations",
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: UserCheck,
      title: "Complimentary matching with an AI engineering expert",
      description: "Get matched with specialized AI consultants for hands-on implementation support",
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connecting Lines */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gray-300 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 opacity-60"></div>
          </div>
          
          {/* Steps */}
          <div className="relative z-10 grid grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center">
                  {/* Icon Circle */}
                  <div className={`w-32 h-32 mx-auto ${step.bgColor} rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white relative`}>
                    <IconComponent className={`w-12 h-12 ${step.color.split(' ')[1]} ${step.color.split(' ')[2]}`} />
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          return (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                {/* Icon Circle */}
                <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center shadow-lg border-4 border-white relative flex-shrink-0`}>
                  <IconComponent className={`w-8 h-8 ${step.color.split(' ')[1]} ${step.color.split(' ')[2]}`} />
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-200"></div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Call to Action */}
      <div className="text-center mt-12">
        <div 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => window.location.href = 'https://my.prismscope.ai'}
        >
          Start Free Assessment
          <ArrowRight className="w-5 h-5 ml-2" />
        </div>
      </div>
    </div>
  )
}

export default ProcessFlowchart