const axios = require('axios');

class HttpClient {
  static new() {
    return new HttpClient();
  }

  constructor() {
    this.defaultHeaders = {};
  }

  setDefaultHeaders(defaultHeaders) {
    this.defaultHeaders = {...defaultHeaders};
  }

  get(path, query) {
    const queryString = query ? `?${new URLSearchParams(query)}` : '';
    return axios.get(path + queryString, {headers: this.defaultHeaders});
  }

  post(path, data) {
    return axios.post(path, data, {headers: this.defaultHeaders});
  }
}

const globalHttpClient = HttpClient.new();
module.exports = {HttpClient, globalHttpClient};