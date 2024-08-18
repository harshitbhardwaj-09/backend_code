import Discussion from '../models/Discussion.js';
import Project from '../models/Project.js';

// Create a new discussion in a project
export const createDiscussion = async (req, res) => {
    try {
        const { projectId, participantIds } = req.body;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        const newDiscussion = new Discussion({
            project: projectId,
            participants: participantIds,
        });

        await newDiscussion.save();
        project.discussions.push(newDiscussion._id);
        await project.save();

        res.status(201).json(newDiscussion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all discussions for a project
export const getDiscussionsByProject = async (req, res) => {
    try {
        const discussions = await Discussion.find({ project: req.params.projectId }).populate('participants messages');
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single discussion by ID
export const getDiscussionById = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).populate('participants messages');
        if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a discussion
export const deleteDiscussion = async (req, res) => {
    try {
        const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!deletedDiscussion) return res.status(404).json({ error: 'Discussion not found' });
        res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
