const AuthenControllerModule = require('./AuthenController');
const SearchControllerModule = require('./SearchController');
const ArtistsControllerModule = require('./ArtistsController');

module.exports = {
  ...AuthenControllerModule,
  ...SearchControllerModule,
  ...ArtistsControllerModule,
};