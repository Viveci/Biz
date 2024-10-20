import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Task } from '../models/taskModel';

const taskRepository = AppDataSource.getRepository(Task);

export const createTask = async (req: Request, res: Response) => {
  const { title, description, deadline } = req.body;
  const task = taskRepository.create({ title, description, deadline });
  await taskRepository.save(task);
  return res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, deadline, completed } = req.body;
  const task = await taskRepository.findOneBy({ id: parseInt(id) });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = title || task.title;
  task.description = description || task.description;
  task.deadline = deadline || task.deadline;
  task.completed = completed !== undefined ? completed : task.completed;

  await taskRepository.save(task);
  return res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await taskRepository.findOneBy({ id: parseInt(id) });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await taskRepository.remove(task);
  return res.status(204).send();
};

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await taskRepository.find();
  return res.status(200).json(tasks);
};

