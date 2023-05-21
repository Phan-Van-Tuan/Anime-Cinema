const ShowTime = require('../models/ShowTime');
const Cinema = require('../models/Cinema');
const Movie = require('../models/Movie');

const { mutipleMongooseToObject } = require('../../until/mongoose');

class ShowTimeController {

    // [GET] /showtime/
    index(req, res) {

        ShowTime.find({})
            .populate('idCinema')
            .populate('idAnime')
            .then(showtimes => {
                res.render('showtime/test', {
                    showtimes: mutipleMongooseToObject(showtimes)
                });
            })
            .catch(err => { res.status(400).json({ error: "ERROR..!!!" }) });

    }

    // [GET] /showtime/create
    create(req, res) {

        Promise.all([Cinema.find({}), Movie.find({})])
            .then(([cinemas, animes]) => {
                res.render('showtime/create', {
                    cinemas: mutipleMongooseToObject(cinemas),
                    animes: mutipleMongooseToObject(animes),
                });
            })
            .catch(err => { res.status(400).json({ error: "ERROR..!!!" }) });

    }

    // [POST] /showtime/create/stored
    creating(req, res) {
        const showtime = new ShowTime(req.body);
        res.status(201).json({ success: true })
        // showtime
        //     .save()
        //     .then(() => res.status(201).json({ success: true }))
        //     .catch((error) => { console.log(error); res.status(400).json({ error: "ERROR...!!!" }) });
    };
    


   
}

module.exports = new ShowTimeController;