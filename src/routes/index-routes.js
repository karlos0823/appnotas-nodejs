const { Router } = require('express');

const {renderIndex, renderAbout} = require('../controllers/index-controllers');

const router = Router();

router.get('/', renderIndex);
router.get('/nosotros', renderAbout);

module.exports = router;