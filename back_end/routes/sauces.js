const router = require('express').Router();
const {
    getAllSauces,
    getOneSauce,
    createOneSauce,
    updateOneSauce,
    deleteOneSauce,
    likeOneSauce
} = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// //////////////////////
// GET ALL Sauces ///////
// //////////////////////
router.get('/',auth, getAllSauces);


// //////////////////////
// GET ONE Sauce ///////
// //////////////////////
router.get('/:id',auth, getOneSauce);


// //////////////////////
// CREATE ONE Sauce ///////
// //////////////////////
router.post('/',auth, multer, createOneSauce);


// //////////////////////
// UPDATE ONE Sauce ///////
// //////////////////////
router.put('/:id',auth, multer, updateOneSauce);


// //////////////////////
// DELETE ONE Sauce ///////
// //////////////////////
router.delete('/:id',auth, deleteOneSauce);

// //////////////////////
// LIKE ONE Sauce ///////
// //////////////////////
router.post('/:id/like',auth, likeOneSauce);



module.exports = router;