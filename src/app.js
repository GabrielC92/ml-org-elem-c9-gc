const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const methodOverride =  require('method-override');
const app = express();

const path = require('path');
const port = 3030;

const localsUser = require('./middlewares/localsUser');
const cookieCheck = require('./middlewares/cookieCheck');

const indexRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: "Liebre forever",
  saveUninitialized: true,
  resave: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(cookieCheck);
app.use(localsUser);

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server running in http://localhost:${port}`));

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});