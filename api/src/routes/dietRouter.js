const {Router} = require('express');
const { getDietHandler } = require('../handlers/dietHandler');

const router = Router();

router.get('/', getDietHandler);

module.exports = router;