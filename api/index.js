var express = require('express');
var router = express.Router();

require('./crud')(router, '')
require('./attachment')(router, '')

module.exports = router;
