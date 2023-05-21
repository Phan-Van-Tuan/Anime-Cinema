const Movie = require('../models/Movie');
const { mutipleMongooseToObject } = require('../../until/mongoose')

class MeController {

    // [GET] me/stored/movies
    storedMovies(req, res, next) {
        Promise.all([Movie.find({}) ,Movie.countDocumentsDeleted()])
            .then(([movies, deleteCount]) => 
                res.render('me/stored-movies', {
                    deleteCount,
                    movies: mutipleMongooseToObject(movies),
                })
            )
            .catch(next);

        // Movie.countDocumentsDeleted()
        //     .then((deleteCount) => {

        //     })
        //     .catch(() => {});
        // Movie.find({})
        //     .then(movies => res.render('me/stored-movies', {
        //         movies: mutipleMongooseToObject(movies)
        //     }))
        //     .catch(next);
    }

    // [GET] me/trash/movies
    trashMovies(req, res, next) {
        Movie.findDeleted({})
            .then(movies => res.render('me/trash-movies', {
                movies: mutipleMongooseToObject(movies)
            }))
            .catch(next);
    }

    storedNews(req, res, next) {
        res.render('news');
    }

    // [GET] me/stored/ticket
    ticket(req, res, next) {
        res.render('me/ticket-movies');
    }

}

module.exports = new MeController;