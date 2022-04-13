const router = require('express').Router();

const {
    getAllUsers,
    createUser,  
    getUserbyId
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserbyId);
    
module.exports = router;