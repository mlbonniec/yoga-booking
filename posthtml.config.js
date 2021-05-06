const path = require('path');

module.exports = {
  plugins: {
    'posthtml-include': {
      root: path.resolve(__dirname, 'src')
    }
  }
}
