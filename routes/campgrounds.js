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

router.post('/', isLoggedIn,function (req, res) {
    var name = req.body.name,
        image = req.body.image,
        desc = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        obj = {name: name, image: image, description: desc, author: author};
    Campground.create(obj, function (err, result) {
        if (err) {
            console.log('Error of type: ' + err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', isLoggedIn,function (req, res) {
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

router.get('/:id/edit', checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCamp) {
        res.render('campgrounds/edit', { campground: foundCamp });
    });
});

router.put('/:id', checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, update) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

router.delete('/:id', checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCamp) {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                if (foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports = router;
