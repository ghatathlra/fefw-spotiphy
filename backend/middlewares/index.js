const ErrorCatcherModule = require('./ErrorCatcher');
const AuthenInspectorModule = require('./AuthenInspector');

module.exports = {
  ...ErrorCatcherModule,
  ...AuthenInspectorModule,
};