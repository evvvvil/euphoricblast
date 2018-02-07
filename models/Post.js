var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	type: { type: Types.Select, options: 'work, lab, blog, page content', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },	
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	author: { type: Types.Relationship, ref: 'User', index: true },
	contentForPage: { type: Types.Select, options: 'home, work, lab, blog, contact', index: true,dependsOn: {type: 'page content' } },
	featuredProject: { type: Types.Boolean, label: 'Tick to make this a featured project', default: false,dependsOn: {type: ['work'] } },
	image: { type: Types.CloudinaryImage, autoCleanup: true,generateFilename: function(file, attemptNumber, callback) {
    var originalname = file.originalname;
    var filenameWithoutExtension = originalname.substring(0, originalname.lastIndexOf('.'));
    var timestamp = new Date().getTime();
    return `${filenameWithoutExtension}-${timestamp}`;
  }  },
	mainImage: { type: Types.CloudinaryImage, folder: 'main/imagebro', autoCleanup: true, use_filename: true },
	projectImages: {type: Types.CloudinaryImages, index: true },
	otherImages: {type: Types.CloudinaryImages, index: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, dependsOn: {type: ['work','lab'] } },
	//pageContent: { type: Types.Relationship, ref: 'PostPageContent', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
