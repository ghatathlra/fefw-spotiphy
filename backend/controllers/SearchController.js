const {SPOTIFY_API_URLS} = require('../services/constants');
const {globalHttpClient} = require('../services/helpers');

class SearchController {
  static new() {
    return new SearchController();
  }

  constructor() {
    this.httpClient = globalHttpClient;
    this.search = this.search.bind(this);
  }

  async search(req, res, next) {
    try {
      const q = req.query ? req.query.q : '';
      const {data} = await this.httpClient.get(SPOTIFY_API_URLS.api + '/search', {
        q: q,
        type: 'track,artist',
      });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

const searchController = SearchController.new();
module.exports = {searchController};
