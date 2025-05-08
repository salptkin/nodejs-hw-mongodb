import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import router from './routers/index.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { ctrlWrapper } from './utils/ctrlWrapper.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = process.env.PORT;

const app = express();
const setupServer = () => {
  
  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // All Routes
  app.use(router);
  app.use('/contacts', contactsRouter);

  app.use('*', ctrlWrapper(notFoundHandler));
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;