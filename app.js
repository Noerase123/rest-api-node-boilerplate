var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
const errorHandler = require('./services/errorHandler')

connect('mongodb://localhost:27017/fitrain', {useUnifiedTopology:true, useNewUrlParser: true})

var api = require('./api')
var user = require('./api/users')

var app = express()

app.set('view engine', 'jade')
app.use('/document', express.static('./public/images'))
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use('/document', express.static(path.join(__dirname, 'public')));

app.use('/api', api)
app.use('/auth', user)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(errorHandler(404,res))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

const { initSocket } = require('./lib/socket.io')
require('./jobs')
require('./lib/firebase')

initSocket(app, 3005)

module.exports = app
