const FeedbackModel = require('../models/feedbackModel');

async function getFeedbackByUserId(req, res) {
  const { userId } = req.params;
  try {
    const feedback = await FeedbackModel.getFeedbackByUserId(userId);
    res.status(200).json(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function createFeedback(req, res) {
  try {
    const { userId } = req.params;
    const { feedback } = req.body;
    const newFeedback = await FeedbackModel.createFeedback(feedback, userId);
    res.status(201).json(newFeedback);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getFeedbackByUserId, createFeedback };
