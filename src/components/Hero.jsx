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
              Organizational Intelligence
            </span>
            <br />
            <span className="text-gray-900">for Everyone</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            <strong>Individual assessments across your organization. Identify high-value organizational ROI with an AI roadmap and implementation plan. Optional expert AI implementation matching.</strong>
          </p>
          
          {/* Process Flowchart */}
          <ProcessFlowchart />
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Our patented chat survey methodology (patent pending) uncovers organizational issues from every individual. 
            We build AI roadmaps with ROI estimates, grouping issues by similarity and functionally defining requirements for each item. 
            Optionally, our partner network of exceptional AI consultants can facilitate implementation within your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              className="btn-primary text-lg flex items-center justify-center"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <Link 
              to="/example-report" 
              className="btn-secondary text-lg"
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