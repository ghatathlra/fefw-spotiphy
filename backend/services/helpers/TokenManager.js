const {SPOTIFY_API_URLS} = require('../constants');
const {HttpClient} = require('./HttpClient');

const {CLIENTID, CLIENTSECRET} = process.env;

class TokenManager {
  static new() {
    return new TokenManager();
  }

  constructor() {
    this.accessToken = '';
    this.httpClient = HttpClient.new();
    this.httpClient.setDefaultHeaders({
      Authorization: this.makeAuthorizationHeaderValue(),
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  async loadToken() {
    const response = await this.httpClient.post(
      SPOTIFY_API_URLS.accounts + '/api/token',
      new URLSearchParams({grant_type: 'client_credentials'}),
    );
    this.accessToken = response.data.access_token;
  }

  getToken() {
    return this.accessToken;
  }

  makeAuthorizationHeaderValue() {
    const base64AuthString = Buffer.from(`${CLIENTID || ''}:${CLIENTSECRET || ''}`).toString('base64');
    return `Basic ${base64AuthString}`;
  }
}

const tokenManager = TokenManager.new();
module.exports = {tokenManager};
