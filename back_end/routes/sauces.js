const router = require('express').Router();
const {
    getAllSauces,
    getOneSauce,
    createOneSauce,
    updateOneSauce,
    deleteOneSauce
} = require('../controllers/sauces');
const auth = require('../middleware/auth');

// //////////////////////
// GET ALL Sauces ///////
// //////////////////////
router.get('/', auth, getAllSauces);


// //////////////////////
// GET ONE Sauce ///////
// //////////////////////
router.get('/:id', auth, getOneSauce);


// //////////////////////
// CREATE ONE Sauce ///////
// //////////////////////
router.post('/', auth, createOneSauce);


// //////////////////////
// UPDATE ONE Sauce ///////
// //////////////////////
router.put('/:id', auth, updateOneSauce);


// //////////////////////
// DELETE ONE Sauce ///////
// //////////////////////
router.delete('/:id', auth, deleteOneSauce);



module.exports = router;