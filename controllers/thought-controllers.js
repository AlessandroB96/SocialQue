const { Thought, User } = require('../models');

const thoughtController = {

    getAllthoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThoughts({ params, body}, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true } //recieving updated user w/ thought
                );
            })
          .then(dbThoughtData => {
              if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
              }
              res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id})
        .select('-__v')
        .sort({ _id: -1 }) //sort by desc order, newest 
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'There is no thought with this id'}); 
                }
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $pull: { thoughts: params.thoughtId}},
                    { new: true }
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;