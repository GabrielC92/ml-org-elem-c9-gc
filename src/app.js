const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const methodOverride =  require('method-override');
const app = express();

const path = require('path');
const port = 3030;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname,'views','home.html')));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname,'views','login.html')));
app.get('/registro', (req,res) => res.sendFile(path.join(__dirname,'views','register.html')));

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