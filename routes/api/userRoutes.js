const router = require('express').Router();
const User = require('./../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).populate(['friends', 'thoughts']).select('-__v');

        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate(['friends', 'thoughts']).select('-__v');

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { returnDocument: "after" });

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        user.thoughts.forEach(thought => Thought.findByIdAndDelete(thought._id));

        await User.findByIdAndDelete(userId);

        res.sendStatus(204);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.post('/:userId/friends', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.friends.push(req.body.friendId);
        user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.friends.splice(req.params.friendId, 1);
        user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;
