const {SPOTIFY_API_URLS} = require('../services/constants');
const {globalHttpClient} = require('../services/helpers');

class ArtistsController {
  static new() {
    return new ArtistsController();
  }

  constructor() {
    this.httpClient = globalHttpClient;
    this.getTopTracks = this.getTopTracks.bind(this);
  }

  async getTopTracks(req, res, next) {
    try {
      const artistId = req.params ? req.params.artistId : '';
      const {data} = await this.httpClient.get(SPOTIFY_API_URLS.api + `/artists/${artistId}/top-tracks`, {
        market: 'VN',
      });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

const artistsController = ArtistsController.new();
module.exports = {artistsController};
