var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground');

router.get('/', function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log('Error of type: ' + err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

router.post('/', function (req, res) {
    var name = req.body.name,
        image = req.body.image,
        desc = req.body.description,
        obj = {name: name, image: image, description: desc};
    Campground.create(obj, function (err, result) {
        if (err) {
            console.log('Error of type: ' + err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', function (req, res) {
    res.render('campgrounds/form');
});

router.get('/:id', function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCamp) {
        if (err) {
            console.log('Error of type: ' + err);
        } else {
            console.log(foundCamp);
            res.render('campgrounds/shows', {campground: foundCamp});
        }
    });
});

module.exports = router;
