#!/usr/bin/env node

var models = require('./models'),
    fs = require('fs'),
    async = require('async'),
    app = require('./app.js');

var User = models.User,
    Item = models.Item,
    Pin = models.Pin,
    Follow = models.Follow;

module.exports = importData = function(){
    async.series([
        function(cb){
            console.log('creating users...');
            User.create({username: 'admin', avatar_url: 'admin.jpg'}, function(){
                User.create({username: 'Andrew', avatar_url: 'https://github.com/identicons/jasonlong.png'});
                User.create({username: 'Sergey', avatar_url: 'https://avatars0.githubusercontent.com/u/4436860?v=3&s=96'});
                User.create({username: 'Thomas', avatar_url: 'https://avatars0.githubusercontent.com/u/125464?v=3&s=96'});
                cb(null);
            });
        },
        function(cb){
            console.log('creating items...');
           var mediaFiles = fs.readdirSync('./media/');
           mediaFiles.forEach(function(fileName){
                Item.create({user: 0, image_url: fileName}, function(err, newArticle){
                    if (err){
                        process.exit(1);
                        return console.log(err);
                    }
                });
            });
            cb(null);
        },
        function(cb){
            console.log('creating pins...');
            Pin.create({actor: 1, item: 1});
            Pin.create({actor: 1, item: 2});
            Pin.create({actor: 1, item: 3});
            Pin.create({actor: 1, item: 4});
            Pin.create({actor: 2, item: 6});
            Pin.create({actor: 1, item: 5});
            Pin.create({actor: 1, item: 7});
            Pin.create({actor: 3, item: 9});
            Pin.create({actor: 3, item: 8});
            Pin.create({actor: 3, item: 4});
            cb(null);
        },
        function(cb){
            console.log('creating follows...');
            Follow.create({actor: 1, target: 2});
            Follow.create({actor: 1, target: 3});
            Follow.create({actor: 2, target: 1});
            Follow.create({actor: 2, target: 3});
            cb(null);
        },
        function(cb){
            console.log('import completed');
            cb();
            process.exit(0);
        }
    ]);
};
if(!module.parent){
    importData();
}