const express = require('express');
const cookieParser = require('cookie-parser');

const {authenController, searchController, artistsController} = require('./controllers');
const {errorCatcher, authenInspector} = require('./middlewares');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.post('/api/login', authenController.login);
app.get('/api/status', authenInspector.inspect, authenController.checkStatus);
app.get('/api/logout', authenInspector.inspect, authenController.logout);

app.get('/api/search', authenInspector.inspect, searchController.search);
app.get('/api/artists/:artistId/top-tracks', authenInspector.inspect, artistsController.getTopTracks);

app.use(errorCatcher.handleError);

module.exports = {app};
