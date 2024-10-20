import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Task } from '../models/taskModel';

const taskRepository = AppDataSource.getRepository(Task);

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, deadline } = req.body;

  if (!title) {
    throw new Error('Title is required');
  }

  const task = taskRepository.create({ title, description, deadline });
  await taskRepository.save(task);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, deadline, completed } = req.body;

  const task = await taskRepository.findOneBy({ id: parseInt(id) });
  if (!task) {
    throw new Error('Task not found'); // Throw error instead of directly responding
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.deadline = deadline || task.deadline;
  task.completed = completed !== undefined ? completed : task.completed;

  await taskRepository.save(task);
  res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const task = await taskRepository.findOneBy({ id: parseInt(id) });
  if (!task) {
    throw new Error('Task not found');
  }

  await taskRepository.remove(task);
  res.status(204).send();
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  const tasks = await taskRepository.find();
  res.status(200).json(tasks);
};

