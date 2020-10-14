'use strict'
const router = require('express').Router();

const {
    signup,
    login,
    getUser,
    updateUser,
    deleteUser,
    exportUser,
    reportUser
} = require('../controllers/user');

const {
    registerValidation
} = require('../middleware/inputValidation');

const auth = require('../middleware/auth');

// //////////////////////
// Create one user ///////
// //////////////////////
router.post('/signup', registerValidation, signup);

// //////////////////////
// Login user ///////
// //////////////////////
router.post('/login', registerValidation, login);

// //////////////////////
// GET user's informations ///////
// //////////////////////
router.get('/users/:id',auth, getUser);

// //////////////////////
// UPDATE user's informations ///////
// //////////////////////
router.put('/users/:id',auth, updateUser);

// //////////////////////
// DELETE user ///////
// //////////////////////
router.delete('/users/:id',auth, deleteUser);

// //////////////////////
// Export user's informations ///////
// //////////////////////
router.get('/users/:id/exports',auth, exportUser);

// //////////////////////
// CREATE report ///////
// //////////////////////
router.post('/users/reports',auth, reportUser);

module.exports = router;