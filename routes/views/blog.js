var keystone = require('keystone');

exports = module.exports = function (req, res) {	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Blog';	
	locals.data = {
		posts: [],
	};

	// Load the posts
	view.on('init', function (next) {

	var q = keystone.list('Post').model.find({
				state: 'published',
				type: 'blog',
			}).sort('-publishedDate');
		q.exec(function (err, results) {
			locals.data.posts = results;
			
			next(err);
		});
	});

	// Render the view
	view.render('blog');
};
