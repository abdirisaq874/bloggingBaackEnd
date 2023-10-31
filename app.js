require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const EmployeeRouter = require('./routes/EmployeesRoutes');
const CategoryRouter = require('./routes/categoryRoutes');
const BlogsRouter = require('./routes/blogRoutes');
// const BlogsSubsribtion = require('./routes/maillingRoutes');
// middleware
const {
  NotFoundRouteMiddleware,
  ErrorHandlerMiddleware,
} = require('./MiddleWare');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(morgan('common'));
app.use(
  cors({
    origin: [
      'https://blogginfrontend.azurewebsites.net',
      'http://localhost:3000',
    ],
    credentials: true,
  })
);
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1', EmployeeRouter);
app.use('/api/v1/categories', CategoryRouter);
app.use('/api/v1/blogs', BlogsRouter);
// app.use('/api/v1/maillings', BlogsSubsribtion);

// app.use('/api/v1/orders', orderRouter);

app.use(NotFoundRouteMiddleware);
app.use(ErrorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
