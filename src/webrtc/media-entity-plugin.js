var Helpers = require('../helpers');
var MediaPlugin = require('./media-plugin');

function MediaEntityPlugin() {
  MediaEntityPlugin.super_.apply(this, arguments);
}

Helpers.inherits(MediaEntityPlugin, MediaPlugin);

/**
 * @param {Object} options
 * @returns {Promise}
 * @fulfilled {PluginResponse} response
 */
MediaEntityPlugin.prototype._create = function(options) {
  var body = Helpers.extend({request: 'create'}, options);
  return this.sendWithTransaction({body: body})
    .catch(function(error) {
      if (error.message.indexOf('already exists') > 0) {
        return error.response;
      } else {
        throw error;
      }
    });
};

/**
 * @param {Object} options
 * @returns {Promise}
 * @fulfilled {PluginResponse} response
 */
MediaEntityPlugin.prototype._destroy = function(options) {
  var body = Helpers.extend({request: 'destroy'}, options);
  return this.sendWithTransaction({body: body});
};

/**
 * @param {Object} [options]
 * @returns {Promise}
 * @fulfilled {PluginResponse} response
 */
MediaEntityPlugin.prototype._list = function(options) {
  var body = Helpers.extend({request: 'list'}, options);
  return this.sendWithTransaction({body: body});
};

module.exports = MediaEntityPlugin;
