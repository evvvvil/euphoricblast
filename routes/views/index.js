var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Home';
	locals.data = {
		categories: [],
		paragraphs: [],
		post: "",
	};
	// Load the page post
	view.on('init', function (next) {
		var q = keystone.list('Post').model.findOne({
				type: 'page content',
				whichMainPage: locals.section.toLowerCase(),				
		});	
		
		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});
	});

	// Load all categories
	view.on('init', function (next) {
		keystone.list('PostCategory').model.find().sort('orderno').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			next(err);			
		});
	});

	
		view.on('init', function (next) {
			var q= keystone.list('Post').model.find({
				state: 'published',				
				type: 'page paragraph',
				whichMainPage: 'Home',							
			}).sort('-publishedDate');
		
			q.exec(function (err, results) {
				locals.data.paragraphs = results;
				next(err);
			});
		});


	// Render the view
	view.render('index', { bodyId: 'home-page', video:'whatever', carousel:'whatever', cloudinaryResponsive: 'whatever'});
};
