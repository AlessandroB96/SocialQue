const router = require('express').Router();

const {
    getAllthoughts,
    createThoughts,
    getThoughtById,
    changeThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllthoughts)

router
    .route('/:id')
    .get(getThoughtById)
    
router
    .route('/:id')
    .post(createThoughts)
    .put(changeThought)

router
    .route('/:userId/:thoughtId')
    .delete(removeThought)

router
    .route('/:thoughtId/reactions')
    .put(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;
