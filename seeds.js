var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    data = [
    {
        name: 'Cloudy Hill',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcToDz1MlyPZ4_F7CC7kgzcfmnkAZOXcVmDI2BlIGJANYOXRz8qk0w',
        description: 'Williamsburg microdosing asymmetrical, migas food truck banjo scenester cornhole fashion axe godard fixie irony whatever crucifix typewriter. Offal before they sold out gastropub kinfolk, hammock health goth etsy umami. Yr banh mi semiotics blog bicycle rights, 3 wolf moon farm-to-table yuccie tacos you probably havent heard of them raw denim pork belly mustache shabby chic. Disrupt venmo craft beer, DIY cold-pressed yr heirloom YOLO bushwick seitan echo park. Whatever mixtape blue bottle, single-origin coffee lumbersexual drinking vinegar gluten-free chartreuse you probably havent heard of them DIY biodiesel fashion axe echo park hashtag. Post-ironic fanny pack stumptown keytar you probably havent heard of them godard. IPhone franzen 3 wolf moon yuccie, messenger bag disrupt put a bird on it slow-carb kombucha.'
    },
    {
        name: 'Another Hill',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS6J_KVvXg3vI5tZ_n6SzQqblSco43fA5R8vGfz1LRCwx1v8M3n',
        description: 'Williamsburg microdosing asymmetrical, migas food truck banjo scenester cornhole fashion axe godard fixie irony whatever crucifix typewriter. Offal before they sold out gastropub kinfolk, hammock health goth etsy umami. Yr banh mi semiotics blog bicycle rights, 3 wolf moon farm-to-table yuccie tacos you probably havent heard of them raw denim pork belly mustache shabby chic. Disrupt venmo craft beer, DIY cold-pressed yr heirloom YOLO bushwick seitan echo park. Whatever mixtape blue bottle, single-origin coffee lumbersexual drinking vinegar gluten-free chartreuse you probably havent heard of them DIY biodiesel fashion axe echo park hashtag. Post-ironic fanny pack stumptown keytar you probably havent heard of them godard. IPhone franzen 3 wolf moon yuccie, messenger bag disrupt put a bird on it slow-carb kombucha.'
    },
    {
        name: 'Sunny Hill',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ4YqcivoRh6LzKGjPDUt5qkpVmCYPpyvMmAKax-lmTPbsOBr6A',
        description: 'Williamsburg microdosing asymmetrical, migas food truck banjo scenester cornhole fashion axe godard fixie irony whatever crucifix typewriter. Offal before they sold out gastropub kinfolk, hammock health goth etsy umami. Yr banh mi semiotics blog bicycle rights, 3 wolf moon farm-to-table yuccie tacos you probably havent heard of them raw denim pork belly mustache shabby chic. Disrupt venmo craft beer, DIY cold-pressed yr heirloom YOLO bushwick seitan echo park. Whatever mixtape blue bottle, single-origin coffee lumbersexual drinking vinegar gluten-free chartreuse you probably havent heard of them DIY biodiesel fashion axe echo park hashtag. Post-ironic fanny pack stumptown keytar you probably havent heard of them godard. IPhone franzen 3 wolf moon yuccie, messenger bag disrupt put a bird on it slow-carb kombucha.'
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Campgrounds removed');

        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('created campground');
                    Comment.create(
                        {
                            text: 'I Like it a lot, two thumbs up!',
                            author: 'Mickey D'
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('created comment');
                                campground.comments.push(comment);
                                campground.save();
                            }
                        });
                }
            });

        });
    });
}

module.exports = seedDB;
