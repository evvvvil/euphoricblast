var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Home';
	locals.data = {
		categories: [],
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

	// Render the view
	view.render('index');
};
