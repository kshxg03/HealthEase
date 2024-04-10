const FeedbackModel = require('../models/feedbackModel');

const addFeedbackController = async (req, res) => {
    const feedback = new FeedbackModel({
        feedback: req.body.feedback,
        postedBy: req.auth._id,
    });

    try {
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {addFeedbackController};

