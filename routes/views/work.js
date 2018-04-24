var keystone = require('keystone');
var async = require('async');
var _ = require('lodash');
var MobileDetect = require('mobile-detect');
//var useragent = require('useragent');
//useragent(true);
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var md = new MobileDetect(req.headers['user-agent']);
//var agent = useragent.parse(req.headers['user-agent']);
//console.log(agent);

    
	// Init locals
	locals.section = 'Work';
	locals.filters = {
		category: req.params.category,
		mobile:md.mobile(),
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
	
//CLEANUP OTHER POLULATE THAT ARE NOT NEEDED!!!
//CLEANUP OTHER POLULATE THAT ARE NOT NEEDED!!!
//CLEANUP OTHER POLULATE THAT ARE NOT NEEDED!!!
//CLEANUP OTHER POLULATE THAT ARE NOT NEEDED!!!
//CLEANUP OTHER POLULATE THAT ARE NOT NEEDED!!!
	

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
			console.log("here no cate"+locals.section.toLowerCase());
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

	// RESET PASSWORD LIKE THIS!!!!!!!
	/*view.on('init', function (next) {
		keystone.list('User').model.findOne({ email: "evvvvil0@gmail.com"}, function(findError, user) {
		  if (findError) {
		    // handle error
		  } else {
		    user.password = "fuckyou";
		    user.save(function(saveError) {
		      if (saveError) {
		        // handle error
		        console.log("password change failed");
		      }else{
		      	console.log("password CHANGED!!!!");
		      }
				next(err);
		    });
		  }
		});
	});*/


// Load the posts
	view.on('init', function (next) {
		if(locals.data.category){
			var q= keystone.list('Post').model.find({
				state: 'published',				
				type: 'work',
			}).sort('-publishedDate').populate('categories');		
			q.where('categories').in([locals.data.category]);

			q.exec(function (err, results) {	
				//remove posts which are already shown as featured posts			
				var inter = _.intersectionBy(results, locals.data.orderedPosts, "slug");
				var diff = _.difference(results,inter);					
				locals.data.posts = diff;
				console.log("posts: "+diff.length);
				
				next(err);
			});
		}else{
			next();
		}		
	});

	// Load the paragraphs
		//SHOULDNT THIS BE SWAPPED AROUND THE IF STATEMENT
		//?????????????????????????????????????????
		//?????????????????
		view.on('init', function (next) {
			var q;
				
		if(locals.data.category){
			q = keystone.list('Post').model.find({
				state: 'published',				
				type: 'page paragraph',
				whichMainPage: 'Work',							
			}).sort('-publishedDate');
		}else{
			q = keystone.list('Post').model.find({
				state: 'published',				
				type: 'page paragraph',
				whichSubPage: locals.data.category,					
			}).sort('-publishedDate');			
		}
			q.exec(function (err, results) {
				locals.data.paragraphs = results;
				next(err);
			});
		});
	
	// Render the view
	view.render('work', { bodyId: 'work-page', carousel:'whatever', cloudinaryResponsive: 'whatever'});
};
