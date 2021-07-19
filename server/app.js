const express = require("express");
const morgan = require("morgan");
const userRouter = require('./routers/userRouter');
const toDoRouter = require('./routers/toDoRouter');
const projectRouter = require('./routers/projectRouter');
const searchRouter = require('./routers/searchRouter');
const AppError = require('./utils/appError');
const globalHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();

// 1) MIDDLEWARES
//Security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


//app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/toDo',toDoRouter);
app.use('/api/v1/projects',projectRouter);
app.use('/api/v1/search',searchRouter);

//For handling unhandled routes
app.all('*',(req, res, next)=>{//all is for all the http methods i.e post, get , patch
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalHandler);

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

module.exports = app;
