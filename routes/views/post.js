var keystone = require('keystone');
exports = module.exports = function (req, res) {
res.setHeader('Cache-Control', 'max-age=86400, public');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'Project';
	locals.orginalURL="http://www.euphoricblast.com"+req.originalUrl;
	locals.filters = {
		post: req.params.post,
		category: req.params.category,
	};
	locals.data = {
		post:"",
		relatedPosts: [],
	};
	
	// Load the current post
	view.on('init', function (next) {
		
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('relatedPosts');
		
		q.exec(function (err, result) {
			locals.data.post = result;
			if(result!=null){	
				locals.data.relatedPosts=result.relatedPosts;
				locals.section=result.type;				
			}			
			
			next(err);
		});
	});
	// Render the view
	view.render('post', { bodyId: 'project-page', lightbox:'whatever', cloudinaryResponsive: 'whatever', pageReloader:'whatever'});
};
