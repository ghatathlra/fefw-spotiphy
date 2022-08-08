const {globalHttpClient, sessionManager} = require('../services/helpers');

class AuthenController {
  static new() {
    return new AuthenController();
  }

  constructor() {
    this.httpClient = globalHttpClient;
    this.sessionManager = sessionManager;
    this.login = this.login.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req, res, next) {
    try {
      const {username, password} = req.body;
      if (username === 'tung' && password === 'p4ssw0rd') {
        const sessionId = sessionManager.createSession();
        res.cookie('SESSIONID', sessionId, {httpOnly: true});
        res.json({username: 'tung', name: 'Tung'});
      } else {
        throw new Error('Username or password is incorrect');
      }
    } catch (err) {
      next(err);
    }
  }

  async checkStatus(req, res, next) {
    try {
      const sessionId = req.cookies ? req.cookies.SESSIONID : '';
      if (sessionId && this.sessionManager.hasActiveSession(sessionId)) {
        res.json({username: 'tung', name: 'Tung'});
      } else {
        res.status(400);
        res.cookie('SESSIONID', 'LOGGEDOFF', {httpOnly: true});
        res.send('Logged off!');
      }
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const sessionId = req.cookies ? req.cookies.SESSIONID : '';
      if (sessionId) {
        this.sessionManager.revokeSession(sessionId);
        res.cookie('SESSIONID', 'LOGGEDOFF', {httpOnly: true});
        res.send('Ok!');
      }
    } catch (err) {
      next(err);
    }
  }
}

const authenController = AuthenController.new();
module.exports = {authenController};
