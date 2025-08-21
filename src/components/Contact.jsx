import { ArrowRight, Mail, Phone, Calendar, Zap } from 'lucide-react'
import ContactForm from './ContactForm'

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Ready to Access What Was Previously Exclusive?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Discovery to Deployment
            <br />
            <span className="text-accent-300">With Expert Implementation</span>
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Get matched with pre-vetted consultants who have successfully deployed similar projects. 
            Turn your organizational insights into actionable implementation plans with proven experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Bring Your Insights, Get Expert Implementation</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent-300 rounded-full mr-4"></div>
                  <span>Share your organizational challenges and automation opportunities</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent-300 rounded-full mr-4"></div>
                  <span>Get matched with experts who turn insights into ROI-focused implementation plans</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent-300 rounded-full mr-4"></div>
                  <span>Optional matching with expert AI consultants for hands-on implementation</span>
                </li>
              </ul>
              <button 
                className="bg-white text-primary-900 font-semibold py-4 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200 flex items-center w-full justify-center text-lg"
                onClick={() => window.location.href = 'https://my.prismscope.ai'}
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-primary-200 mb-2">Questions? Get in touch:</p>
              <a 
                href="mailto:harrison@provoco.ai" 
                className="text-accent-300 hover:text-accent-200 font-semibold text-lg"
              >
                harrison@provoco.ai
              </a>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 rounded-2xl p-8">
            <p className="text-lg text-primary-100 mb-4 italic">
              &ldquo;We employ AI to better understand the daily chores that hinder an organization from being their best. 
              Our democratic insights tool intelligently understands and diagnoses issues with a focus on ROI and automation.&rdquo;
            </p>
            <p className="text-accent-300 font-semibold">
              — Christopher Harrison, PhD, Prismscope Architect
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact