var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var Email = require('keystone-email');
var handlebars=require('express-handlebars');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'Contact';
	//locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.enquiryFailed = false;
locals.data = {
		post: "",
	};
	// Load the page post
	view.on('init', function (next) {
		var q = keystone.list('Post').model.findOne({
				type: 'page content',
				whichMainPage: 'contact',				
			});			
		
		
		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});
	});


	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
				
			} else{
				console.log(locals);
				next();
			}
			
		});
	});

	view.on('post', { action: 'contact' }, function (next) {
// test-email.js

new Email('./templates/views/partials/email-enquiry.hbs', {
  transport: 'mailgun',
  engine: handlebars.create({
		layoutsDir: './templates/views/layouts',
		partialsDir: './templates/views/partials',
		defaultLayout: '',
		helpers: new require('../../templates/views/helpers')(),
		extname: '.hbs',
	}).engine,
}).send(locals, {
  to: 'evvvvil0@gmail.com',
  from: {
    name: 'EB WEB: '+locals.formData["name.full"],
    email: locals.formData.email,
  },
  subject: 'Enquiry from EUPHORIC BLAST',
	}, function (err, result) {
	  if (err) {
	    console.error('Mailgun send failed with error:\n', err);
	    locals.enquiryFailed = true;
	  } else {
	    console.log('Successfully sent Mailgun email with result:\n', result);
		locals.enquirySubmitted = true;
		next();
	  }
	});
});		

	view.render('contact');
};
