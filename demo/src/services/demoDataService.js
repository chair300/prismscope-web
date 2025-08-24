/**
 * Demo Data Service
 * Provides access to static demo data files
 */

// Import the demo data
import sessionsData from '../../data/sessions.json';
import messagesData from '../../data/messages.json';
import issuesData from '../../data/issues.json';
import reportsData from '../../data/reports.json';
import usersData from '../../data/users.json';
import metadataData from '../../data/metadata.json';

const DEMO_USER_EMAIL = 'demo@example.com';

class DemoDataService {
  constructor() {
    this.sessions = sessionsData;
    this.messages = messagesData;
    this.issues = issuesData;
    this.reports = reportsData;
    this.users = usersData;
    this.metadata = metadataData;
  }

  // Session methods
  async getUserSessions(userEmail = DEMO_USER_EMAIL) {
    return this.sessions.filter(session => 
      session.userAuth?.email === userEmail
    ).sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
  }

  async getSession(sessionId) {
    return this.sessions.find(session => session.sessionId === sessionId);
  }

  async getSessionWithMessages(sessionId) {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    const messages = this.messages
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return {
      ...session,
      conversation: {
        messages: messages.map(msg => ({
          id: msg.messageId,
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
          hasAnalysis: msg.hasAnalysis,
          analysis: msg.analysis
        })),
        messageCount: messages.length,
        startedAt: session.startedAt,
        lastMessageAt: session.lastMessageAt
      }
    };
  }

  // Issue methods
  async getUserIssues(userEmail = DEMO_USER_EMAIL) {
    return this.issues
      .filter(issue => issue.userAuth?.email === userEmail)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async getSessionIssues(sessionId) {
    return this.issues
      .filter(issue => issue.sessionId === sessionId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async getIssue(issueId) {
    return this.issues.find(issue => issue.issueId === issueId);
  }

  // Report methods
  async getUserReports(userEmail = DEMO_USER_EMAIL) {
    return this.reports.filter(report => report.userEmail === userEmail);
  }

  async getLatestReport(userEmail = DEMO_USER_EMAIL) {
    const reports = await this.getUserReports(userEmail);
    return reports.length > 0 ? reports[0] : null;
  }

  // User methods
  async getUser(userEmail = DEMO_USER_EMAIL) {
    return this.users.find(user => user.email === userEmail);
  }

  // Admin methods (for demo dashboard)
  async getAllSessions() {
    return this.sessions.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
  }

  async getAllIssues() {
    return this.issues.sort((a, b) => b.timestamp - a.timestamp);
  }

  async getStats() {
    return {
      sessions: this.sessions.length,
      issues: this.issues.length,
      reports: this.reports.length,
      users: this.users.length,
      lastUpdated: this.metadata.created,
      metadata: this.metadata
    };
  }

  // Analytics methods
  async getDashboardStats() {
    const stats = await this.getStats();
    const technicalIssues = this.issues.filter(issue => issue.category === 'technical').length;
    const organizationalIssues = this.issues.filter(issue => issue.category === 'organizational').length;
    
    return {
      ...stats,
      technicalIssues,
      organizationalIssues,
      averageSessionLength: this.sessions.reduce((sum, session) => {
        const start = new Date(session.startedAt);
        const end = new Date(session.lastMessageAt);
        return sum + ((end - start) / (1000 * 60)); // minutes
      }, 0) / this.sessions.length,
      completionRate: this.sessions.filter(s => s.status === 'completed').length / this.sessions.length
    };
  }
}

// Export singleton instance
export const demoDataService = new DemoDataService();
export default demoDataService;