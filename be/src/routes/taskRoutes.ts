import { Router } from 'express';
import { createTask, updateTask, deleteTask, getAllTasks } from '../controllers/taskController';

const router = Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;

