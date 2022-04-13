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
}

module.exports = thoughtController;