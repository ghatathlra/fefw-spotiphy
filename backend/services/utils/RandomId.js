const {nanoid} = require('nanoid');

class RandomId {
  static new() {
    return new RandomId();
  }

  generate() {
    return nanoid();
  }
}

const randomId = RandomId.new();
module.exports = {randomId};