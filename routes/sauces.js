const express = require('express');
const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

const router = express.Router();

/**
 * Our routes for the CRUD on our API
 */
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;