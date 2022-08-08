const {sessionManager} = require('../services/helpers');

class AuthenInspector {
  static new() {
    return new AuthenInspector();
  }

  constructor() {
    this.sessionManager = sessionManager;
    this.inspect = this.inspect.bind(this);
  }

  inspect(req, _, next) {
    const sessionId = req.cookies ? req.cookies.SESSIONID : '';
    if (sessionId && this.sessionManager.hasActiveSession(sessionId)) {
      next();
    } else {
      next(new Error('User is not authenticated'));
    }
  }
}

const authenInspector = AuthenInspector.new();
module.exports = {authenInspector};