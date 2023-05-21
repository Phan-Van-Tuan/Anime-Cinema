const Movie = require('../models/Movie');
const { mutipleMongooseToObject } = require('../../until/mongoose')

class SiteController {

    // [GET] /home
    index(req, res) {

        Movie.find({})
            .then(movies => {
                res.render('home', {
                    movies: mutipleMongooseToObject(movies)
                });
            })
            .catch(err => { res.status(400).json({ error: "ERROR..!!!" }) });

    }

    // [GET] /privacy-policy
    privacyPolicy(req, res) {
        res.render('regulations/privacyPolicy');
    }

    // [GET] /terms-of-use
    termsOfUse(req, res) {
        res.render('regulations/termsOfUse');
    }

    // [GET] /conditions
    conditions(req, res) {
        res.render('regulations/conditions');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }


}

module.exports = new SiteController;