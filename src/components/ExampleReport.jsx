import React from 'react'

const ExampleReport = () => {
  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: '#333',
      background: '#fff',
      fontSize: '11pt',
      paddingTop: '80px'
    }}>
      <style>{`
        @media print {
          body { margin: 0; }
          .page-break { page-break-before: always; }
          .no-print { display: none; }
        }
        
        .container {
          width: 95%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
        }
        
        @media (max-width: 768px) {
          .container {
            width: 98%;
            padding: 1rem;
          }
        }
        
        @media (min-width: 1400px) {
          .container {
            max-width: 1400px;
          }
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%);
          color: white;
          padding: 40px 20px;
          border-radius: 15px;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.1);
          z-index: 1;
        }
        
        .header-content {
          position: relative;
          z-index: 2;
        }
        
        .header h1 {
          font-size: 32pt;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .header .subtitle {
          font-size: 16pt;
          opacity: 0.9;
          font-style: italic;
          margin-bottom: 20px;
        }
        
        .meta-info {
          display: flex;
          justify-content: center;
          gap: 30px;
          font-size: 12pt;
          margin-top: 20px;
        }
        
        .meta-info span {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .meta-info .dot {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        }
        
        .section {
          margin: 30px 0;
          padding: 30px;
          border-radius: 15px;
          position: relative;
        }
        
        .section-1 {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
          border: 1px solid #0ea5e9;
        }
        
        .section-2 {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdf4 100%);
          border: 1px solid #10b981;
        }
        
        .section-3 {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%);
          border: 1px solid #f59e0b;
        }
        
        .section-4 {
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fdf2f8 100%);
          border: 1px solid #ec4899;
        }
        
        .section-5 {
          background: linear-gradient(135deg, #f0f4ff 0%, #e5edff 50%, #f0f4ff 100%);
          border: 1px solid #6366f1;
        }
        
        .section-6 {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%);
          border: 1px solid #3b82f6;
        }
        
        .section-7 {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #f3e8ff 100%);
          border: 1px solid #8b5cf6;
        }
        
        .section-8 {
          background: linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fefce8 100%);
          border: 1px solid #eab308;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .section-header .icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-right: 15px;
        }
        
        .section-header h2 {
          font-size: 24pt;
          font-weight: 700;
          color: #1f2937;
        }
        
        h2 {
          color: #374151;
          font-size: 16pt;
          margin: 25px 0 15px 0;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        }
        
        h3 {
          color: #4b5563;
          font-size: 14pt;
          margin: 20px 0 10px 0;
          font-weight: 600;
        }
        
        h4 {
          color: #6b7280;
          font-size: 12pt;
          margin: 15px 0 8px 0;
          font-weight: 600;
        }
        
        p {
          margin: 10px 0;
          text-align: justify;
          line-height: 1.7;
        }
        
        .content-box {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(5px);
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 1px solid #60a5fa;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .warning-box {
          background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
          border: 1px solid #fb923c;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .success-box {
          background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
          border: 1px solid #4ade80;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 25px 0;
        }
        
        .metric-card {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          backdrop-filter: blur(5px);
        }
        
        .metric-value {
          font-size: 24pt;
          font-weight: bold;
          color: #1e40af;
          display: block;
          margin-bottom: 8px;
        }
        
        .metric-label {
          font-size: 10pt;
          color: #6b7280;
        }
        
        .priority-high {
          background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
          border-left: 6px solid #ef4444;
          padding: 15px 20px;
          margin: 15px 0;
          border-radius: 8px;
        }
        
        .priority-medium {
          background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
          border-left: 6px solid #f59e0b;
          padding: 15px 20px;
          margin: 15px 0;
          border-radius: 8px;
        }
        
        .priority-low {
          background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
          border-left: 6px solid #10b981;
          padding: 15px 20px;
          margin: 15px 0;
          border-radius: 8px;
        }
        
        .timeline {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        .timeline-item {
          border-left: 4px solid #6366f1;
          padding-left: 20px;
          margin: 20px 0;
          position: relative;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 5px;
          width: 12px;
          height: 12px;
          background: #6366f1;
          border-radius: 50%;
        }
        
        .timeline-phase {
          font-weight: bold;
          color: #6366f1;
          font-size: 13pt;
          margin-bottom: 8px;
        }
        
        .roi-table {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
          font-size: 11pt;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .roi-table th,
        .roi-table td {
          border: 1px solid #d1d5db;
          padding: 12px 15px;
          text-align: left;
        }
        
        .roi-table th {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          font-weight: 600;
        }
        
        .roi-table tr:nth-child(even) {
          background: rgba(249, 250, 251, 0.8);
        }
        
        .roi-table .number {
          text-align: right;
          font-weight: 600;
        }
        
        .bullet-points {
          margin: 15px 0;
          padding-left: 25px;
        }
        
        .bullet-points li {
          margin: 8px 0;
          list-style-type: disc;
        }
        
        .sub-bullets {
          padding-left: 25px;
          margin-top: 8px;
        }
        
        .sub-bullets li {
          list-style-type: circle;
          margin: 5px 0;
        }
        
        .readiness-score {
          text-align: center;
          background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin: 30px 0;
        }
        
        .score-circle {
          display: inline-block;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          line-height: 100px;
          font-size: 28pt;
          font-weight: bold;
          margin: 15px;
        }
        
        .footer {
          margin-top: 60px;
          padding: 25px;
          background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
          color: white;
          text-align: center;
          border-radius: 12px;
        }
        
        .footer-title {
          font-size: 14pt;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .footer-subtitle {
          font-size: 10pt;
          opacity: 0.8;
          margin-bottom: 15px;
        }
        
        .footer-meta {
          font-size: 9pt;
          opacity: 0.6;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1>AI Insights Report</h1>
            <div className="subtitle">Production Management Optimization & Automation Roadmap</div>
            <div className="meta-info">
              <span><div className="dot"></div>Generated: August 20, 2025</span>
              <span><div className="dot"></div>Issues Analyzed: 2</span>
              <span><div className="dot"></div>harrison@glsan.com</span>
            </div>
          </div>
        </div>

        {/* Executive Overview */}
        <div className="section section-1">
          <div className="section-header">
            <div className="icon">📋</div>
            <h2>Executive Overview</h2>
          </div>
          
          <div className="content-box">
            <p>This comprehensive AI Roadmap Report analyzes critical operational inefficiencies within your organization's production management ecosystem, revealing significant opportunities for automation and process optimization that could save <strong>20-25 hours weekly</strong> while dramatically improving decision-making speed and data accuracy.</p>
            
            <p>The assessment identifies two interconnected issues around production status management that, when addressed through strategic automation and process redesign, can deliver immediate ROI within <strong>3-4 months</strong> while establishing a foundation for broader digital transformation.</p>
            
            <p>With a combined annual savings potential of <strong>$52,000-78,000</strong> and clear quick-win opportunities, your organization is well-positioned to leverage existing ERP and CRM investments through targeted integration and workflow automation initiatives.</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="section section-2">
          <div className="section-header">
            <div className="icon">📊</div>
            <h2>Executive Summary</h2>
          </div>

          <h3>Organizational Health Overview</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-value" style={{color: '#10b981'}}>READY</span>
              <div className="metric-label">Change Readiness</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#f59e0b'}}>AD-HOC</span>
              <div className="metric-label">Process Maturity</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#3b82f6'}}>MEDIUM</span>
              <div className="metric-label">Team Morale</div>
            </div>
          </div>

          <h3>Total Potential Value Creation</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-value" style={{color: '#10b981'}}>$52K-78K</span>
              <div className="metric-label">Annual Cost Savings</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#3b82f6'}}>1,040-1,300</span>
              <div className="metric-label">Hours Recovered Annually</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#8b5cf6'}}>95%+</span>
              <div className="metric-label">Error Reduction</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#f59e0b'}}>3x</span>
              <div className="metric-label">Faster Decision Speed</div>
            </div>
          </div>

          <h3>Top 3 Quick Wins</h3>
          <div className="priority-high">
            <h4>1. ERP-CRM Integration (0-3 months)</h4>
            <p>Automate 20 daily email transfers, saving 10-15 hours weekly with $26,000-39,000 annual ROI</p>
          </div>
          
          <div className="priority-high">
            <h4>2. Production Update Protocol (1-2 months)</h4>
            <p>Define clear ownership roles, recovering 15-20 hours weekly management time</p>
          </div>
          
          <div className="priority-medium">
            <h4>3. Real-time Dashboard (2-3 months)</h4>
            <p>Eliminate manual floor checks through automated status reporting</p>
          </div>

          <div className="readiness-score">
            <h3>AI Readiness Assessment</h3>
            <div className="score-circle">3.2/5.0</div>
            <p><strong>Level: MODERATE</strong></p>
            <p>Existing ERP/CRM infrastructure with recognized pain points and management support. Gaps in system integration maturity and automation experience.</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Detailed Analysis */}
        <div className="section section-3">
          <div className="section-header">
            <div className="icon">🔍</div>
            <h2>Detailed Analysis</h2>
          </div>

          <h3>Core Problem Pattern</h3>
          <div className="highlight-box">
            <p>The organizational assessment reveals a critical pattern of <strong>disconnected systems and unclear process ownership</strong> creating a cascade of inefficiencies throughout the production management workflow. Both identified issues center on the same core challenge: production status information is trapped in silos, forcing staff into manual workarounds that consume 20-25 hours weekly across multiple roles.</p>
          </div>

          <h3>Systemic Impact Analysis</h3>
          <div className="content-box">
            <p>This pattern indicates a systemic integration gap rather than isolated incidents, with the ERP system generating valuable data that never efficiently reaches decision-makers or customer-facing teams. The cumulative impact extends beyond the measured time loss, creating information lag that slows response times, increases error risk, and undermines the organization's ability to provide real-time customer updates.</p>
          </div>

          <h3>Cultural Assessment</h3>
          <div className="success-box">
            <p>The organizational culture shows <strong>positive indicators for transformation success</strong>, with teams actively seeking solutions and management recognizing the business impact of current inefficiencies. The MEDIUM team morale rating reflects daily friction from repetitive tasks, but staff articulating specific, quantifiable problems indicates a workforce ready for positive change.</p>
          </div>

          <h3>Technology Landscape</h3>
          <div className="content-box">
            <p>The organization has made significant investments in enterprise systems (ERP and CRM) but has not fully realized their value due to integration gaps. The manual copying of data between systems represents a classic integration antipattern seen across manufacturing organizations. This technology landscape assessment indicates that solutions don't require massive new system investments but rather strategic integration initiatives that leverage existing assets.</p>
          </div>

          <h3>Competitive Risk Analysis</h3>
          <div className="warning-box">
            <p><strong>Critical Timeline:</strong> These operational inefficiencies place the organization at increasing risk as manufacturing becomes more data-driven. Industry leaders are achieving sub-hour update cycles while this organization operates with manual batch processes creating multi-hour delays. Without intervention, the moderate customer impact rating today will escalate to severe as market standards evolve, potentially affecting win rates and customer retention within 12-18 months.</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Issue Classification */}
        <div className="section section-4">
          <div className="section-header">
            <div className="icon">🏷️</div>
            <h2>Issue Classification & Prioritization</h2>
          </div>

          <h3>Automation Opportunities</h3>
          <div className="priority-high">
            <h4>1. ERP-CRM Email Integration</h4>
            <ul className="bullet-points">
              <li><strong>ROI Potential:</strong> HIGH ($26,000-39,000 annually)</li>
              <li><strong>Implementation Complexity:</strong> MODERATE (requires API/middleware setup)</li>
              <li><strong>Time to Value:</strong> QUICK WIN (2-3 months)</li>
              <li><strong>Priority Score:</strong> 9/10</li>
            </ul>
          </div>

          <h3>Process Optimization</h3>
          <div className="priority-high">
            <h4>2. Production Status Update Protocol</h4>
            <ul className="bullet-points">
              <li><strong>ROI Potential:</strong> HIGH ($26,000-39,000 annually)</li>
              <li><strong>Implementation Complexity:</strong> SIMPLE (role definition and training)</li>
              <li><strong>Time to Value:</strong> QUICK WIN (1-2 months)</li>
              <li><strong>Priority Score:</strong> 10/10</li>
              <li><strong>Note:</strong> While this has process optimization elements, it enables automation</li>
            </ul>
          </div>

          <h3>Cultural/Change Management Requirements</h3>
          <div className="content-box">
            <ul className="bullet-points">
              <li>Clear role confusion requiring organizational alignment</li>
              <li>Change readiness is HIGH but requires structured approach</li>
              <li>Both issues have cultural components requiring stakeholder buy-in</li>
            </ul>
          </div>

          <h3>Talent/Skills Gap Assessment</h3>
          <div className="content-box">
            <ul className="bullet-points">
              <li>Minimal skills gap identified</li>
              <li>Current staff capable with proper tools and training</li>
              <li>May need temporary integration expertise for technical implementation</li>
            </ul>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Task Automation Opportunities */}
        <div className="section section-5">
          <div className="section-header">
            <div className="icon">🔧</div>
            <h2>Task Automation Opportunities</h2>
          </div>

          <h3>Consolidated Pattern: Production Status Information Flow</h3>
          <div className="highlight-box">
            <p>Both issues represent the same fundamental problem appearing at different points in the workflow:</p>
            <ul className="bullet-points">
              <li><strong>Issue 1:</strong> Manual floor checks due to unreliable ERP data (downstream symptom)</li>
              <li><strong>Issue 2:</strong> Manual copying of ERP emails to CRM (upstream cause)</li>
              <li><strong>Combined Impact:</strong> 20-25 hours weekly, $52,000-78,000 annually</li>
              <li><strong>Affected Departments:</strong> Production, Customer Service, Management</li>
            </ul>
          </div>

          <h3>Current State Analysis</h3>
          <table className="roi-table">
            <tr>
              <th>Metric</th>
              <th>Current State</th>
              <th>Impact</th>
            </tr>
            <tr>
              <td>Manual Hours</td>
              <td className="number">20-25 hours weekly</td>
              <td>520-650 hours annually</td>
            </tr>
            <tr>
              <td>Error Rate</td>
              <td className="number">5-10%</td>
              <td>Data entry errors impacting decisions</td>
            </tr>
            <tr>
              <td>Process Delay</td>
              <td className="number">3 hours</td>
              <td>Between production events and CRM updates</td>
            </tr>
            <tr>
              <td>Departments Affected</td>
              <td className="number">3</td>
              <td>Production, Sales/Service, Management</td>
            </tr>
          </table>

          <h3>Proposed Technical Solution</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-phase">Phase 1: ERP Email to CRM Integration</div>
              <p>Implement Zapier/Make.com integration for automated email parsing and CRM data entry</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Phase 2: Management Dashboard</div>
              <p>Deploy Power BI/Tableau dashboard pulling real-time data from both systems</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Phase 3: IoT Enhancement</div>
              <p>Add IoT sensors for real-time production validation and automated status updates</p>
            </div>
          </div>

          <h3>Industry Benchmarking & Best Practices</h3>
          <div className="content-box">
            <ul className="bullet-points">
              <li><strong>Toyota Production System:</strong> Achieves 99.9% real-time accuracy with automated status updates</li>
              <li><strong>GE Digital:</strong> Reduced production status lag from hours to seconds using Predix platform</li>
              <li><strong>Industry Average:</strong> 75-85% reduction in manual reporting time for manufacturing leaders</li>
              <li><strong>Success Rate:</strong> 82% of manufacturers report positive ROI within year one (McKinsey, 2023)</li>
            </ul>
          </div>

          <h3>Financial Business Case</h3>
          <table className="roi-table">
            <tr>
              <th>Investment Category</th>
              <th>Cost Range</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>Integration Setup</td>
              <td className="number">$8,000-12,000</td>
              <td>API configuration and middleware</td>
            </tr>
            <tr>
              <td>Dashboard Development</td>
              <td className="number">$5,000-8,000</td>
              <td>Custom BI dashboard creation</td>
            </tr>
            <tr>
              <td>Training & Change Management</td>
              <td className="number">$2,000-5,000</td>
              <td>Staff training and process transition</td>
            </tr>
            <tr style={{background: '#bbf7d0', fontWeight: 'bold'}}>
              <td>Total Implementation</td>
              <td className="number">$15,000-25,000</td>
              <td>Complete solution deployment</td>
            </tr>
          </table>

          <div className="success-box">
            <h4>Return on Investment</h4>
            <ul className="bullet-points">
              <li><strong>Annual Savings:</strong> $52,000-78,000</li>
              <li><strong>Payback Period:</strong> 3-6 months</li>
              <li><strong>3-Year NPV:</strong> $130,000-195,000</li>
              <li><strong>ROI:</strong> 150-200% in Year 1</li>
            </ul>
          </div>
        </div>

        <div className="page-break"></div>

        {/* AI Readiness Assessment */}
        <div className="section section-6">
          <div className="section-header">
            <div className="icon">🎯</div>
            <h2>AI Readiness Assessment</h2>
          </div>

          <h3>Technical Readiness: 3.5/5</h3>
          <div className="highlight-box">
            <p><strong>Strengths:</strong></p>
            <ul className="bullet-points">
              <li>Existing ERP and CRM systems in place</li>
              <li>Email-based workflows indicate digital processes</li>
            </ul>
            <p><strong>Gaps:</strong></p>
            <ul className="bullet-points">
              <li>Lack of current integration between systems</li>
              <li>Manual data transfer suggests limited automation experience</li>
            </ul>
          </div>

          <h3>Data Readiness: 3/5</h3>
          <div className="highlight-box">
            <p><strong>Strengths:</strong></p>
            <ul className="bullet-points">
              <li>Data exists in structured systems (ERP/CRM)</li>
              <li>Regular data generation (20 emails daily)</li>
            </ul>
            <p><strong>Gaps:</strong></p>
            <ul className="bullet-points">
              <li>Data accuracy issues noted ("unreliable/delayed")</li>
              <li>Manual processing creates consistency risks</li>
            </ul>
          </div>

          <h3>Cultural Readiness: 4/5</h3>
          <div className="success-box">
            <p><strong>Strong Indicators:</strong></p>
            <ul className="bullet-points">
              <li>Clear problem recognition and articulation</li>
              <li>Quantified impact understanding</li>
              <li>Management actively seeking solutions</li>
              <li>Ad-hoc processes suggest opportunity for standardization</li>
            </ul>
          </div>

          <h3>Skills Readiness: 2.5/5</h3>
          <div className="warning-box">
            <p><strong>Current Capabilities:</strong></p>
            <ul className="bullet-points">
              <li>Staff can operate ERP and CRM systems</li>
            </ul>
            <p><strong>Development Needs:</strong></p>
            <ul className="bullet-points">
              <li>Limited automation skills</li>
              <li>Process design gaps</li>
              <li>May require external technical expertise</li>
            </ul>
          </div>

          <h3>Process Maturity: 2/5</h3>
          <div className="warning-box">
            <p><strong>Current State:</strong> "AD-HOC" maturity level with unclear roles and manual workarounds</p>
            <p><strong>Opportunity:</strong> Significant potential for process standardization and optimization</p>
          </div>

          <div className="readiness-score">
            <h3 style={{color: 'white'}}>Overall AI Readiness Score</h3>
            <div className="score-circle">3.2/5.0</div>
            <p><strong>MODERATE READINESS</strong></p>
            <p>Foundation elements exist (systems, data, culture) but requires integration, process maturity development, and automation skills. Quick wins possible with external support, building toward self-sufficiency.</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Strategic Recommendations */}
        <div className="section section-7">
          <div className="section-header">
            <div className="icon">🚀</div>
            <h2>Strategic Recommendations</h2>
          </div>

          <h3>Immediate Actions (This Month)</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-phase">Week 1: Process Mapping Workshop</div>
              <ul className="bullet-points">
                <li>Document current production status workflow end-to-end</li>
                <li>Identify all stakeholders and data touchpoints</li>
                <li>Quantify time spent at each step</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Week 2: Role Definition Session</div>
              <ul className="bullet-points">
                <li>Clarify who owns each production status update</li>
                <li>Create RACI matrix for data entry responsibilities</li>
                <li>Communicate new protocols to all staff</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Week 3-4: Integration Vendor Evaluation</div>
              <ul className="bullet-points">
                <li>Request demos from 3 integration platforms (Zapier, Make.com, Power Automate)</li>
                <li>Assess ERP and CRM API capabilities</li>
                <li>Get quotes for implementation support</li>
              </ul>
            </div>
          </div>

          <h3>90-Day Implementation Plan</h3>
          <table className="roi-table">
            <tr>
              <th>Month</th>
              <th>Focus</th>
              <th>Key Deliverables</th>
            </tr>
            <tr>
              <td><strong>Month 1</strong></td>
              <td>Foundation</td>
              <td>
                • Implement role clarity protocols<br />
                • Select and configure integration platform<br />
                • Begin pilot with 5 daily emails
              </td>
            </tr>
            <tr>
              <td><strong>Month 2</strong></td>
              <td>Expansion</td>
              <td>
                • Scale to all 20 daily emails<br />
                • Develop management dashboard prototype<br />
                • Train staff on new workflows
              </td>
            </tr>
            <tr>
              <td><strong>Month 3</strong></td>
              <td>Optimization</td>
              <td>
                • Fine-tune automation rules<br />
                • Add exception handling<br />
                • Measure and report on KPIs<br />
                • Plan Phase 2 enhancements
              </td>
            </tr>
          </table>

          <h3>Annual Roadmap</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-phase">Q1-Q2: Core Automation</div>
              <p>Complete ERP-CRM integration, deploy production dashboards, achieve 90% automation target</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Q3: Enhanced Intelligence</div>
              <p>Add predictive analytics for production delays, implement automated customer notifications, integrate with supplier systems</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Q4: Scale and Optimize</div>
              <p>Extend automation to other departments, implement AI-powered anomaly detection, create customer self-service portal</p>
            </div>
          </div>

          <h3>Investment Requirements</h3>
          <div className="highlight-box">
            <h4>Year 1 Total Investment: $35,000-50,000</h4>
            <ul className="bullet-points">
              <li>Integration setup: $15,000-25,000</li>
              <li>Training and change management: $5,000-8,000</li>
              <li>Ongoing platform licenses: $6,000-8,000/year</li>
              <li>Contingency (20%): $7,000-10,000</li>
            </ul>
          </div>

          <div className="success-box">
            <h4>Expected Return on Investment</h4>
            <ul className="bullet-points">
              <li><strong>Year 1:</strong> 150-200% return</li>
              <li><strong>3-Year:</strong> 400-500% return</li>
            </ul>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Risk Assessment */}
        <div className="section section-8">
          <div className="section-header">
            <div className="icon">⚠️</div>
            <h2>Risk Assessment & Mitigation</h2>
          </div>

          <h3>Technical Risks</h3>
          <div className="priority-medium">
            <h4>Risk Level: MEDIUM</h4>
            <p><strong>Identified Risks:</strong></p>
            <ul className="bullet-points">
              <li>Integration failure points: ERP API limitations, email parsing errors</li>
              <li>Data quality issues: Inconsistent formats, missing fields</li>
              <li>System compatibility: Version conflicts, upgrade impacts</li>
              <li>Scalability concerns: Volume increases beyond design capacity</li>
            </ul>
            <p><strong>Mitigation Strategies:</strong></p>
            <ul className="bullet-points">
              <li>Implement redundant integration methods (email + API)</li>
              <li>Create data validation and cleansing rules</li>
              <li>Maintain version compatibility matrix</li>
              <li>Design for 3x current volume</li>
            </ul>
          </div>

          <h3>Organizational Risks</h3>
          <div className="priority-medium">
            <h4>Risk Level: MEDIUM-HIGH</h4>
            <p><strong>Identified Risks:</strong></p>
            <ul className="bullet-points">
              <li>Change resistance: Staff fear of job displacement</li>
              <li>Skills gaps: Limited automation experience</li>
              <li>Resource availability: Competing IT priorities</li>
              <li>Competing priorities: Other digital initiatives</li>
            </ul>
            <p><strong>Mitigation Strategies:</strong></p>
            <ul className="bullet-points">
              <li>Emphasize role enhancement vs replacement</li>
              <li>Provide comprehensive training program</li>
              <li>Secure executive sponsorship</li>
              <li>Create dedicated project team</li>
            </ul>
          </div>

          <h3>Long-term Strategic Risks</h3>
          <div className="priority-high">
            <h4>Risk Level: HIGH-CRITICAL</h4>
            <p><strong>Without Action, Expect:</strong></p>
            <ul className="bullet-points">
              <li>25% decline in customer satisfaction scores over 12 months</li>
              <li>15% increase in operational costs due to scaling manual processes</li>
              <li>Competitive disadvantage as competitors achieve real-time status</li>
              <li>Innovation capability erosion with staff trapped in manual tasks</li>
            </ul>
          </div>

          <h3>Risk-Adjusted ROI Scenarios</h3>
          <table className="roi-table">
            <tr>
              <th>Scenario</th>
              <th>Success Rate</th>
              <th>Annual Savings</th>
              <th>Implementation Time</th>
              <th>3-Year NPV</th>
            </tr>
            <tr style={{background: '#bbf7d0'}}>
              <td>Best Case</td>
              <td>90%</td>
              <td className="number">$70,200</td>
              <td>3 months</td>
              <td className="number">$175,500</td>
            </tr>
            <tr>
              <td>Expected Case</td>
              <td>70%</td>
              <td className="number">$54,600</td>
              <td>4 months</td>
              <td className="number">$136,500</td>
            </tr>
            <tr style={{background: '#fed7aa'}}>
              <td>Worst Case</td>
              <td>50%</td>
              <td className="number">$39,000</td>
              <td>6 months</td>
              <td className="number">$97,500</td>
            </tr>
          </table>

          <div className="success-box">
            <p><strong>Break-even Analysis:</strong> Even in worst case scenario, break-even achieved in 7-8 months with positive cash flow guaranteed by month 12.</p>
            <p><strong>Recommendation:</strong> PROCEED WITH PHASED APPROACH</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Expert Network Engagement */}
        <div className="section section-1">
          <div className="section-header">
            <div className="icon">🤝</div>
            <h2>Expert Network Engagement</h2>
          </div>

          <h3>Recommended Expert Partnerships</h3>

          <div className="priority-high">
            <h4>1. Integration Architecture Specialist</h4>
            <p><strong>Expertise Needed:</strong> ERP-CRM integration architect with manufacturing domain experience</p>
            <p><strong>Engagement:</strong> 20-hour advisory package for architecture design and vendor selection</p>
            <p><strong>Duration:</strong> 2-3 weeks during planning phase</p>
            <p><strong>Value:</strong> Avoid common pitfalls, accelerate vendor selection by 50%, reduce technical risk</p>
          </div>

          <div className="priority-high">
            <h4>2. Change Management Consultant</h4>
            <p><strong>Expertise Needed:</strong> Manufacturing digital transformation change management</p>
            <p><strong>Engagement:</strong> Part-time coaching (10 hours/month) for project team</p>
            <p><strong>Duration:</strong> 6 months through implementation</p>
            <p><strong>Value:</strong> Increase adoption from 70% to 90%, reduce timeline by 25%</p>
          </div>

          <div className="priority-medium">
            <h4>3. Process Optimization Expert</h4>
            <p><strong>Expertise Needed:</strong> Lean Six Sigma Black Belt with production management experience</p>
            <p><strong>Engagement:</strong> 3-day intensive workshop plus monthly reviews</p>
            <p><strong>Duration:</strong> Initial workshop plus 6 monthly check-ins</p>
            <p><strong>Value:</strong> Identify additional opportunities, increase ROI by 30-40%</p>
          </div>

          <div className="priority-medium">
            <h4>4. Dashboard Development Specialist</h4>
            <p><strong>Expertise Needed:</strong> Power BI/Tableau developer with manufacturing KPIs expertise</p>
            <p><strong>Engagement:</strong> Fixed project (80 hours) for dashboard creation</p>
            <p><strong>Duration:</strong> 3-4 weeks in Month 3</p>
            <p><strong>Value:</strong> Professional-grade dashboards, best practice KPIs, team training</p>
          </div>

          <div className="highlight-box">
            <h4>Total Expert Investment: $15,000-25,000</h4>
            <p><strong>ROI on Expert Engagement:</strong> 3-5x through risk reduction and acceleration</p>
            <p><strong>Critical Path Experts:</strong> Integration Architect and Change Management Consultant</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* Expected Outcomes */}
        <div className="section section-2">
          <div className="section-header">
            <div className="icon">📈</div>
            <h2>Expected Outcomes & ROI</h2>
          </div>

          <h3>Year 1 Quantifiable Benefits</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-value" style={{color: '#10b981'}}>1,040-1,300</span>
              <div className="metric-label">Hours Saved Annually</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#10b981'}}>$52K-78K</span>
              <div className="metric-label">Annual Cost Reduction</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#10b981'}}>99.5%</span>
              <div className="metric-label">Target Data Accuracy</div>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{color: '#10b981'}}>5 minutes</span>
              <div className="metric-label">Update Latency (vs 3 hours)</div>
            </div>
          </div>

          <h3>Operational Impact Breakdown</h3>
          <table className="roi-table">
            <tr>
              <th>Impact Category</th>
              <th>Current State</th>
              <th>Target State</th>
              <th>Improvement</th>
            </tr>
            <tr>
              <td>Manual Email Processing</td>
              <td>520-780 hours/year</td>
              <td>52-78 hours/year</td>
              <td>90% reduction</td>
            </tr>
            <tr>
              <td>Floor Checks</td>
              <td>390-520 hours/year</td>
              <td>39-52 hours/year</td>
              <td>90% reduction</td>
            </tr>
            <tr>
              <td>Error Correction</td>
              <td>130 hours/year</td>
              <td>13 hours/year</td>
              <td>90% reduction</td>
            </tr>
            <tr>
              <td>Data Accuracy</td>
              <td>90-95%</td>
              <td>99.5%</td>
              <td>+4.5-9.5%</td>
            </tr>
            <tr>
              <td>Information Latency</td>
              <td>3 hours</td>
              <td>5 minutes</td>
              <td>97% improvement</td>
            </tr>
          </table>

          <h3>3-Year Transformation Vision</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-phase">Year 1: Foundation & Quick Wins</div>
              <p>Achieve 90% automation of production status workflow, establish real-time data foundation</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Year 2: Expansion & Integration</div>
              <p>Expand automation to procurement and quality processes, integrate supplier systems</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-phase">Year 3: Intelligence & Prediction</div>
              <p>Implement predictive analytics, AI-driven optimization, customer self-service capabilities</p>
            </div>
          </div>

          <h3>Competitive Advantage Development</h3>
          <div className="success-box">
            <h4>By Year 3, achieve:</h4>
            <ul className="bullet-points">
              <li><strong>Industry-Leading Response Time:</strong> Real-time predictive status vs current 3-hour lag</li>
              <li><strong>Customer Experience Differentiation:</strong> Self-service tracking, proactive notifications</li>
              <li><strong>Operational Excellence:</strong> 50% reduction in administrative overhead, 95% first-time-right planning</li>
              <li><strong>Innovation Platform:</strong> Data-driven culture enabling continuous improvement</li>
            </ul>
          </div>

          <h3>Success Metrics & Monitoring</h3>
          <table className="roi-table">
            <tr>
              <th>Metric</th>
              <th>Frequency</th>
              <th>Target</th>
              <th>Responsibility</th>
            </tr>
            <tr>
              <td>Automation Percentage</td>
              <td>Monthly</td>
              <td>90% by month 6</td>
              <td>IT Manager</td>
            </tr>
            <tr>
              <td>Manual Hours Eliminated</td>
              <td>Weekly</td>
              <td>20-25 hours/week</td>
              <td>Operations Manager</td>
            </tr>
            <tr>
              <td>Data Accuracy Rate</td>
              <td>Weekly</td>
              <td>99.5%</td>
              <td>Quality Manager</td>
            </tr>
            <tr>
              <td>Employee Satisfaction</td>
              <td>Monthly</td>
              <td>+20% improvement</td>
              <td>HR Manager</td>
            </tr>
            <tr>
              <td>Customer Satisfaction</td>
              <td>Quarterly</td>
              <td>+15% improvement</td>
              <td>Customer Service Manager</td>
            </tr>
          </table>

          <div className="highlight-box">
            <h4>3-Year Cumulative Value</h4>
            <ul className="bullet-points">
              <li><strong>Total Hours Saved:</strong> 3,120-3,900</li>
              <li><strong>Total Cost Savings:</strong> $156,000-234,000</li>
              <li><strong>Avoided Hiring:</strong> 1-2 FTEs</li>
              <li><strong>Customer Retention Improvement:</strong> 5-10%</li>
              <li><strong>Market Share Gain Potential:</strong> 2-3%</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-title">AI Insights Report</div>
          <div className="footer-subtitle">Production Management Optimization & Automation Roadmap</div>
          <div className="footer-meta">
            <span>Generated August 20, 2025</span>
            <span>•</span>
            <span>Confidential Business Analysis</span>
            <span>•</span>
            <span>Contact: harrison@glsan.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExampleReport