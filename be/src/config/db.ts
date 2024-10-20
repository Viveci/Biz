import { DataSource } from 'typeorm';
import { Task } from '../models/taskModel';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './todo.sqlite',
  entities: [Task],
  synchronize: true, // Automatically create the table if it doesn't exist
});

