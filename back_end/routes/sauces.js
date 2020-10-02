const router = require('express').Router();
const {
    getAllSauces,
    getOneSauce,
    createOneSauce,
    updateOneSauce,
    deleteOneSauce
} = require('../controllers/sauces');

// //////////////////////
// GET ALL Sauces ///////
// //////////////////////
router.get('/', getAllSauces);


// //////////////////////
// GET ONE Sauce ///////
// //////////////////////
router.get('/:id', getOneSauce);


// //////////////////////
// CREATE ONE Sauce ///////
// //////////////////////
router.post('/', createOneSauce);


// //////////////////////
// UPDATE ONE Sauce ///////
// //////////////////////
router.put('/:id', updateOneSauce);


// //////////////////////
// DELETE ONE Sauce ///////
// //////////////////////
router.delete('/:id', deleteOneSauce);



module.exports = router;