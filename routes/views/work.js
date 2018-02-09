var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Work';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		featuredPosts: [],
		categories: [],
		posts: [],
		post: "",
	};

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

	// Load the posts
	view.on('init', function (next) {
		var q = keystone.list('Post').model.find({
				state: 'published',				
				type: 'work',
			})
			.sort('-publishedDate')
			.populate('categories');
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	// Load the page post
	view.on('init', function (next) {
		var q;
		console.log(locals.data.category);
		if(locals.data.category){
			q = keystone.list('Post').model.findOne({
				type: 'page content',
				whichSubPage: locals.data.category,				
			});
		}else{
			q = keystone.list('Post').model.findOne({
				type: 'page content',
				whichMainPage: 'work',				
			});			
		}
		
		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});
	});

	if(req.params.category==undefined){
		// Load the featured posts
		view.on('init', function (next) {
			var q = keystone.list('Post').model.find({
					state: 'published',				
					type: 'work',
					featuredProject: true,
				})
				.sort('-publishedDate')
				.populate('categories');

			if (locals.data.category) {
				q.where('categories').in([locals.data.category]);
			}

			q.exec(function (err, results) {
				locals.data.featuredPosts = results;
				next(err);
			});
		});
	}


	
	// Render the view
	view.render('work');
};
