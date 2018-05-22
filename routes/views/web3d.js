var keystone = require('keystone');
var async = require('async');
var _ = require('lodash');
//var MobileDetect = require('mobile-detect');
exports = module.exports = function (req, res) {
	//res.setHeader('Cache-Control', 'max-age=86400, public');
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'Work';
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
	};

	/* RECEIVE AJAX
	view.on('post', function (next,result) { 
 		locals.filters.widtho=JSON.stringify(Number(req.body.width));
		next();
	});*/

	// Load all categories
	view.on('init', function (next) {
		keystone.list('PostCategory').model.find().sort('orderno').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {
				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});
			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the page post
	view.on('init', function (next) {
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
			/*if (locals.data.category) {
				q.where('categories').limit(1).in([locals.data.category]);
			}*/
			q.exec(function (err, results) {
				locals.data.featuredPosts = results;
				next(err);
			});

		});

// Load the posts
	view.on('init', function (next) {
		if(locals.data.category){
			var q= keystone.list('Post').model.find({
				state: 'published',				
				type: 'work',
			}).sort('-publishedDate').populate('categories');		
			q.where('categories').in([locals.data.category]);

			q.exec(function (err, results) {	
				//remove posts which are already shown as ordered posts			
				var inter = _.intersectionBy(results, locals.data.orderedPosts, "slug");
				var diff = _.difference(results,inter);					
				locals.data.posts = diff;				
				next(err);
			});
		}else{
			next();
		}		
	});

	// Load the paragraphs
		view.on('init', function (next) {
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
		});
	
	// Render the view
	view.render('web3d', { layout: 'layout3d',bodyId: 'work-page', carousel:'whatever', cloudinaryResponsive: 'whatever'});
};
