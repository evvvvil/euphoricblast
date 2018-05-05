var keystone = require('keystone');

exports = module.exports = function (req, res) {
	//res.setHeader('Cache-Control', 'max-age=86400, public');	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'Blog';
	locals.orginalURL="http://www.euphoricblast.com"+req.originalUrl;	
	locals.data = {
		posts: [],
		post:"",
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
	view.render('blog', { bodyId: 'blog-page', video:'whatever', carousel:'whatever', cloudinaryResponsive: 'whatever'});
};
