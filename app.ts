import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import namecheapRouter from './api/namecheap/routes';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// Routes
app.use('/api/namecheap', namecheapRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
    status: 404
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Set locals, only providing error in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    message: err.message,
    error: isDevelopment ? err : {},
    status: err.status || 500
  });
});

// Server is started in bin/www.ts

export default app;
