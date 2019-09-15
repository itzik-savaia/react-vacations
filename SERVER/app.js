var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')



var indexRouter = require('./routes/index');
var vacationRouter = require('./routes/vacation');
var usersRouter = require('./routes/users');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/uploads',express.static(__dirname+'/uploads'));




app.use('/vacation', vacationRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);


//DB Connection
// const db = require("./Servises/config/db.config")
// const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   initial();
// });
// function initial() {
//   Role.create({
//     id: 1,
//     name: "USER"
//   });

//   Role.create({
//     id: 2,
//     name: "ADMIN"
//   });

//   Role.create({
//     id: 3,
//     name: "PM"
//   });
// }
//DB Connection


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
