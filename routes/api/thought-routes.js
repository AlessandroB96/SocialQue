const router = require('express').Router();

const {
    getAllthoughts,
    createThoughts
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllthoughts)
    
router
    .route('/:userId')
    .post(createThoughts)
    

module.exports = router;
