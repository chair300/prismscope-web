import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProcessFlowchart from './ProcessFlowchart'

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Prismscope
            </span>
            <br />
            <span className="text-gray-900">Uncover Hidden Inefficiencies Through Your People's Eyes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            <strong><em>"We know our people are busy, but where exactly are those hours going? Which activities are costing us the most money, and what can we actually do about it?"</em></strong>
          </p>
          
          <p className="text-lg text-primary-600 font-semibold mb-4">
            For businesses ready for real results, stop being tired of technology promises.
          </p>
          
          {/* Process Flowchart */}
          <ProcessFlowchart />
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            We survey everyone in your organization to discover what they personally consider time-wasted, map all the touchpoints and processes, then create measurable KPIs so you can track and improve ROI.
            We calculate the exact hourly cost of each inefficiency, giving you a prioritized list of what's actually worth fixing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/demo" 
              className="btn-primary text-lg flex items-center justify-center"
            >
              Check out the demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button 
              className="btn-secondary text-lg"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Free Assessment
            </button>
            <Link 
              to="/example-report" 
              className="text-primary-600 hover:text-primary-700 underline text-lg font-semibold"
            >
              See Example Report
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero