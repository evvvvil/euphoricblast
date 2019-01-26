var keystone = require('keystone');
var async = require('async');
var _=require('lodash');
var request = require("request");
var path = require('path');
var fs = require('fs');
var ytdl=require("ytdl-core");
 
//var MobileDetect = require('mobile-detect');

exports = module.exports = function (req, res) {
	//res.setHeader('Cache-Control', 'max-age=86400, public');
	var view = new keystone.View(req, res);
	var locals = res.locals;
	//console.log(res.locals.io);

	// Init locals
	locals.section = '3d VR website';
	locals.orginalURL="http://www.euphoricblast.com"+req.originalUrl;
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		featuredPosts: [],
		orderedPosts: [],
		categories: [],
		posts: [],
		paragraphs: [],
		videobr: "",
		categoriesNames:[],		
	};
	// Load all categories
	view.on('init', function (next) {
		keystone.list('PostCategory').model.find().sort('orderno').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			locals.data.categoriesNames=_.map(results, 'name');
			var filepath = path.resolve(__dirname, 'videooo.mp4');
/*ytdl.getInfo("http://www.youtube.com/watch?v=hNH4WRVHwz4", function(err, info){
	console.log("get info "+JSON.stringify(info));
        //videoName = info.title.replace('|','').toString('ascii');
        //res.set('Content-Disposition', 'attachment; filename=' +    videoName + '.mp3');    
        		//next(err);
   });  */
			ytdl('http://www.youtube.com/watch?v=hNH4WRVHwz4').pipe(fs.createWriteStream(filepath));
								
			//	locals.data.videobr=videobro;
				//locals.io.emit('projectVideo', 'http://localhost:3000/video.mp4');
	next(err);
		});
	});



	// Render the view
	view.render('vt', { layout: 'default',bodyId: 'work-page', cloudinaryResponsive: 'whatever'});
};
