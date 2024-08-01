const express = require('express');
const router = express.Router();
const multerConfig = require('../multerConfig');
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middlewares/auth');

router.post('/upload', authMiddleware, multerConfig.single('file'), mediaController.uploadMedia);
router.get('/', authMiddleware, mediaController.getMedia);
router.delete('/:id', authMiddleware, mediaController.deleteMedia);

module.exports = router;
