var keystone = require('keystone');
var async = require('async');
var _=require('lodash');
var request = require("request");
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
		post: "",
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
			// Load the counts for each category
			/*async.each(locals.data.categories, function (category, next) {
				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});
			}, function (err) {
				next(err);
			}); IF YOU'RE PUTTING THIS BACK IN THEN REMOVE THIS BELOW: */
			next(err);
		});
	});

	// Load the featured posts
	view.on('init', function (next) {
		var q = keystone.list('Post').model.find({
				state: 'published',				
				type: 'work',
				featured: true,
			})
			.sort('-publishedDate')
			.populate('categories');		
		q.exec(function (err, results) {
			locals.data.featuredPosts = results;
			console.log("results length"+results.length);
			next(err);
		});
	});	

			view.on('post', function (next,result) {
	 		var ajaxMessage=req.body.message;
			if(ajaxMessage=="next_page_yo"){
				var categoryIndex=Number(req.body.cat)-1;
				var q= keystone.list('Post').model.find({
					state: 'published',				
					type: 'work',
				}).sort('-publishedDate').populate('categories');

				q.where('categories').in([locals.data.categories[categoryIndex]]);
				
				q.exec(function (err, results) {	
					//remove posts which are already shown as ordered posts			
					/*var inter = _.intersectionBy(results, locals.data.orderedPosts, "slug");
					var diff = _.difference(results,inter);				
					locals.data.posts = diff;*/
					locals.data.posts = results;
					locals.io.emit('projectsData', locals.data.posts);				
					next(err);
				});
			}else if(ajaxMessage=="scrape_the_fuck_outta_vimeo"){				
				var url="https://player.vimeo.com/video/"+req.body.originalVideoURL.split(".com/")[1];
				console.log("ORIGINAL URL IS:"+url);
				request({
				  uri: url,
				  method: "GET",
				  timeout: 10000,
				  headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'},
				  followRedirect: false,
				  maxRedirects: 10,
				}, function (error, response, body) {
					//console.log("RESPONSE:"+JSON.stringify(response));
   					var bodyString=body.toString(),
   					start=bodyString.indexOf('video/mp4')+27,
   					end=bodyString.indexOf('"cdn"')-2;
   					var scrapedUrl=bodyString.substring(start,end);
   					locals.io.emit('projectVideo', scrapedUrl);
   					next(error);
   					//console.log("SCRAPPED HIDDEN VIDEO URL IS: "+scrapedUrl);
				});	
			}else if(ajaxMessage=="scrape_the_fuck_outta_youtube"){								
				var filepath = './public/videos/project-video.mp4';
				var vid=ytdl('http://www.youtube.com/watch?v=hNH4WRVHwz4',{ filter: (format) => format.container === 'mp4' });
				vid.pipe(fs.createWriteStream(filepath));
				vid.on('end', function(){locals.io.emit('projectVideo','/videos/project-video.mp4' ); res.end;});
				next();
			}else{
				next();
			}			
		});

	// Load the page post
	/*view.on('init', function (next) {
		var q;
		if(locals.data.category){
			q = keystone.list('Post').model.findOne({
				type: 'page content',
				whichSubPage: locals.data.category,				
			}).populate('postsOrder');

			q.exec(function (err, result) {
				locals.data.post = result;
				if(result!=null){
					locals.data.orderedPosts = result.postsOrder;	
				}			
				next(err);
			});

		}else{
			q = keystone.list('Post').model.findOne({
				type: 'page content',
				whichMainPage: locals.section.toLowerCase(),				
			});			
			q.exec(function (err, result) {
				locals.data.post = result;		
				next(err);
			});
		}
		
	});*/

	// Load the paragraphs
	/*	view.on('init', function (next) {
			var q;
				
		if(locals.data.category){
			q = keystone.list('Post').model.find({
				state: 'published',				
				type: 'page paragraph',
				whichSubPage: locals.data.category,					
			}).sort('-publishedDate');	
		}else{			
			q = keystone.list('Post').model.find({
				state: 'published',				
				type: 'page paragraph',
				whichMainPage: 'work',							
			}).sort('-publishedDate');
		}
			q.exec(function (err, results) {
				locals.data.paragraphs = results;
				next(err);
			});
		});*/
	
	// Render the view
	view.render('web3d', { layout: 'layout3d',bodyId: 'work-page', cloudinaryResponsive: 'whatever'});
};
