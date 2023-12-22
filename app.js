var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/setupteams')
var cardRouter = require('./routes/card');
var packRouter = require('./routes/pack');
var eventRouter = require('./routes/events')
var gameRouter = require('./routes/games')

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/setup', teamsRouter)
app.use('/card', cardRouter)
app.use('/pack', packRouter)
app.use('/events', eventRouter)
app.use('/games', gameRouter)

module.exports = app;
