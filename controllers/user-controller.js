const User = require('../models/User');

const userController = {

    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'  //tells mongoose that we dont care about the __v feild on comments (minus sign in front indicates that we dont want to return it)
            })
            .select('-__v')
            .sort({ _id: -1 })  //sort to newest pizzas by desc order
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //we descructure the body out of the req object becuase we only need body 
    createUser({ body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    getUserbyId({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'  //tells mongoose that we dont care about the __v feild on comments (minus sign in front indicates that we dont want to return it)
        })
        .select('-__v')
        .sort({ _id: -1 })  //sort to newest pizzas by desc order
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = userController;