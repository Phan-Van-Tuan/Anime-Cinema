const newsRouter = require('./news');
const moviesRouter = require('./movies');
const meRouter = require('./me');
const siteRouter = require('./site');
const bookingRouter = require('./booking')
const showtimeRouter = require('./showtime');
const loginRouter = require('./login');

function route(app) {

    app.use('/movies', moviesRouter);
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/booking', bookingRouter);
    app.use('/showtime', showtimeRouter);
    app.use('/login', loginRouter);
    app.use('/', siteRouter);
}


module.exports = route;