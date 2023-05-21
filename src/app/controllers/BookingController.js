const querystring = require('querystring');
const cheerio = require('cheerio');
const Cinema = require('../models/Cinema');
const ShowTime = require('../models/ShowTime');
const Movie = require('../models/Movie');
const moment = require('moment');
const { mutipleMongooseToObject } = require('../../until/mongoose');
// const url = require('url');
// const axios = require('axios');

class BookingController {

    // [GET] /choose-a-chair
    chair(req, res) {
        // chuyển hướng tới endpoint khác có query parameter
        res.render('booking/chair', { nameAnime: req.query.nameAnime, cinema: req.query.cinema, date: req.query.date, time: req.query.time });
    }

    // [GET] /choose-cinema
    cinema(req, res) {
        const name = req.query.name
        res.render('booking/cinema', { name: name });
    }

    // [GET] /pay
    pay(req, res) {
        const dataPay = req.query;
        res.json(dataPay);
        // res.render('booking/pay', { });
    }

    // [GET] /cinemas
    cinemas(req, res, next) {
        Cinema.find({})
            .then(cinemas => {
                res.render('booking/cinemas', {
                    cinemas: mutipleMongooseToObject(cinemas)
                });
            })
            .catch(err => { res.status(400).json({ error: "ERROR..!!!" }) });
    };

    // [GET] /choose-movie

    movie(req, res) {
        const id_cinema = req.query.id_cinema;
        var selectedDate = req.query.date;
        var selectedDateFormat = moment().format('YYYY-MM-DD');
        if (selectedDate) {
            selectedDateFormat = moment(selectedDate).format('YYYY-MM-DD');
        }

        console.log(selectedDate)
        console.log(selectedDateFormat)

        Cinema.findById(id_cinema)
            .then(
                async cinema => {
                    var nameCinema = cinema.name;
                    Movie.find({})
                        .then(async movies => {
                            const movieShowtimes = []
                            for (let i = 0; i < movies.length; i++) {
                                const movie = movies[i].name;
                                const showtimes = await ShowTime.find({
                                    idAnime: movies[i]._id,
                                    idCinema: id_cinema,
                                    date: selectedDateFormat,
                                })
                                const movieData = {
                                    movie: movie,
                                    showtimes: mutipleMongooseToObject(showtimes)
                                };
                                movieShowtimes.push(movieData);
                            }

                            res.render('booking/movie', {
                                nameCinema,
                                movieShowtimes,
                                selectedDate,
                            })
                        })
                        .catch(err => console.log(err))
                },

            )
            .catch(err => console.log(err))

    }
    // getNewUrl = (req, res) => {
    //     // Lấy url hiện tại và query parameters
    //     const currentUrl = url.parse(req.url, true);
    //     const queryParameters = currentUrl.query;

    //     // Thêm query parameter mới
    //     queryParameters.newParameter = 'value';

    //     // Tạo url mới từ url hiện tại và query parameters mới
    //     const newUrl = `${currentUrl.pathname}?${new URLSearchParams(queryParameters).toString()}`;


    //     // Gửi yêu cầu GET với url mới đến server
    //     // Sử dụng thư viện 'request' hoặc 'axios' để gửi yêu cầu GET
    //     // Ví dụ sử dụng thư viện 'axios':
    //     // axios.get(newUrl)
    //     //     .then(response => {
    //     //         res.send(response.data);
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //         res.send('Error while fetching data');
    //     //     });
    // };

}

module.exports = new BookingController;