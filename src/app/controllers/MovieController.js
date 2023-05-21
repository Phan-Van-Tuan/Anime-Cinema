const Movie = require('../models/Movie');
const multer = require('multer');
const fs = require('fs');
const { mongooseToObject } = require('../../until/mongoose');

// const upload = multer({ dest: 'src/public/uploads'});

const storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, 'src/public/uploads');
    },
    filename: (req, file, res) => {
        res(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single('image');


class MovieController {


    // [GET] /movies/:slug
    show(req, res, next) {
        Movie.findOne({ slug: req.params.slug })
            .then((movie) => {
                res.render('movies/show', {
                    movie: mongooseToObject(movie)
                });
            })
            .catch(next);
    }

    // [GET] /movies/create
    create(req, res, next) {
        res.render('movies/create');
    }

    // [GET] /movies/:id/edit
    edit(req, res, next) {
        Movie.findById(req.params.id)
            .then(movie => res.render('movies/edit', {
                movie: mongooseToObject(movie)
            }))
            .catch(next)

    }

    // [POST] /movies/store
    store(req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                next;
            }
            const formData = req.body;
            formData.image = `/uploads/${req.file.filename}`;

            const movie = new Movie(formData);
            movie
                .save()
                .then(() => res.redirect('/me/stored/movies'))
                .catch((error) => { });
        });
        
    }
    // [PUT] /movies/:id
    update(req, res, next) {
        Movie.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/movies'))
            .catch(next);

    }

    // [DELETE] /movies/:id
    delete(req, res, next) {
        Movie.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);


    }

    // [DELETE] /movies/delete-forever//:id
    deleteForever(req, res, next) {

        Movie.findById(req.params.id)
            .then( res.redirect('back'))
            .catch(next)

        // fs.unlink(req.params, function (err) {
        //     if (err) throw err;
        //     console.log('File deleted!');
        // });

    //     movie = await Movie.deleteOne();
    //     await Movie.findById(movie._id);
    }


    // [PATCH] /movies/:id/restore
    restore(req, res, next) {
        Movie.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }

    // [POST] /movies/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Movie.delete({ _id: { $in: req.body.movieIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ mesage: 'Action is invalid!' });
        }

    }
}

module.exports = new MovieController;