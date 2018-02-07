var keystone = require('keystone');
var async = require('async');
var _ = require('lodash');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Work';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('orderno').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			/* this is how to modify something in list of result before passing it...
						async.each(results, function (category, next) {
							category.name = category.name.slice(2);
						}, function (err) {
							next(err);
						});
			*/

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

		/*PAGINATION EXAMPLE
		WARNING! remember in hbs file change "data.posts" to "data.posts.results"
		AND add this where you want apgination widget: {{>pagination}}

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
				type: 'work',
			},
		}).sort('-publishedDate')
			.populate('author categories');*/

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
			locals.data.posts = results;
			console.log(results);
			next(err);
		});
	});

	// Render the view
	view.render('work');
};