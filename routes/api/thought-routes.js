const router = require('express').Router();

const {
    getAllthoughts,
    createThoughts,
    getThoughtById,
    removeThought
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllthoughts)

router
    .route('/:id')
    .get(getThoughtById)
    
router
    .route('/:userId')
    .post(createThoughts)

router
    .route('/:userId/:thoughtId')
    .delete(removeThought)

module.exports = router;
