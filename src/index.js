const path = require('path');
const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
const { engine } = require ('express-handlebars');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

// static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));
// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('handlebars', 
  engine({
    extname: '.handlebars',
    helpers: {
      sum: (a,b) => a + b,
      eq: function (a, b) {
        return a === b;
      }
    },
  }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

Handlebars.registerHelper('dateFormat', function(date, options) {
  if (!date) {
      return '';
  }

  if (!(date instanceof Date)) {
      date = new Date(date);
  }

  return date.toLocaleDateString(options);
});


// routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})