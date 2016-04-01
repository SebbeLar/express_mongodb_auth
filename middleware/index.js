var Campground = require('../models/campground'),
    Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in');
    res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCamp) {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                if (foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You need to be logged in to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You need to be logged in to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports = middlewareObj;
