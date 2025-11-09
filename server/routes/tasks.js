import express from 'express';
import Task from '../models/Task.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    // Update overdue status
    const now = new Date();
    tasks.forEach(task => {
      if (!task.completed && new Date(task.deadline) < now) {
        task.isOverdue = true;
      }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { title, deadline } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ error: 'Title and deadline are required' });
    }

    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      return res.status(400).json({ error: 'Deadline must be in the future' });
    }

    const task = new Task({
      userId: req.user.userId,
      title,
      deadline: deadlineDate,
      isOverdue: false
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task (toggle complete or edit)
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update fields
    if (req.body.hasOwnProperty('completed')) {
      task.completed = req.body.completed;
      task.completedAt = req.body.completed ? new Date() : null;
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.deadline) task.deadline = new Date(req.body.deadline);

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
