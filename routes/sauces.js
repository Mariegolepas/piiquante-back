const express = require('express');
const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', auth, saucesCtrl.getAllStuff);
router.post('/', auth, multer, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.put('/:id', auth, multer, saucesCtrl.modifyThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);

module.exports = router;