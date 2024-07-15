const {Thought, User} = require("../../models");
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({}).select('-__v');

        res.status(200).json(thoughts);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).select('-__v');

        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username });
        const user = await User.findById(req.body.userId);

        user.thoughts.push(thought._id);
        user.save();

        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { returnDocument: "after" });

        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.delete('/:thoughtId', async (req, res) => {
   try {
       await Thought.findByIdAndDelete(req.params.thoughtId);

       res.sendStatus(204);
   } catch (err) {
       res.status(400).json(err.message);
   }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        const reaction = {
            reactionBody: req.body.reactionBody,
            username: req.body.username
        };

        thought.reactions.push(reaction);
        thought.save();

        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        const reactionIndex = thought.reactions.indexOf(req.params.reactionId);

        thought.reactions.splice(reactionIndex, 1);
        thought.save();

        res.status(200).json(thought);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;
