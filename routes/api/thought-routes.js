const router = require('express').Router();

const {
    getAllthoughts
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllthoughts);

module.exports = router;
