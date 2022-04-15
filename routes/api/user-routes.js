const router = require('express').Router();

const {
    getAllUsers,
    createUser,  
    getUserbyId,
    deleteUser,
    addFriend,
    removeFriend,
    updateUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserbyId)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;