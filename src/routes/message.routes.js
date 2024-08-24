import express from 'express';
import { getMessages, createMessage, getMessageById, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

// Get all messages for a discussion
router.get('/:discussionId', getMessages);

// Create a new message
router.post('/:discussionId', createMessage);

// Get a specific message by ID
router.get('/details/:id', getMessageById);

// Delete a message by ID
router.delete('/:id', deleteMessage);

export default router;
