const {randomId} = require('../utils');

class SessionManager {
  static new() {
    return new SessionManager();
  }

  constructor() {
    this.sessions = {};
    this.randomId = randomId;
  }

  createSession() {
    const newSessionId = this.randomId.generate();
    this.sessions[newSessionId] = true;
    return newSessionId;
  }

  hasActiveSession(sessionId) {
    return !!this.sessions[sessionId];
  }

  revokeSession(sessionId) {
    this.sessions[sessionId] = false;
  }
}

const sessionManager = SessionManager.new();
module.exports = {sessionManager};

