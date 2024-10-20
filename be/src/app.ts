import express from 'express';
import taskRoutes from './routes/taskRoutes';
import { AppDataSource } from './config/db';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/api', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend is up ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

