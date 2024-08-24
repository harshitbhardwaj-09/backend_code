import express from 'express';
import { getDiscussions, createDiscussion, getDiscussionById, addMessageToDiscussion } from '../controllers/discussionController.js';

const router = express.Router();

// Get all discussions related to a project
router.get('/:projectId', getDiscussions);

// Create a new discussion for a project
router.post('/:projectId', createDiscussion);

// Get a specific discussion by ID
router.get('/details/:id', getDiscussionById);

// Add a message to a discussion
router.post('/:discussionId/messages', addMessageToDiscussion);

export default router;
