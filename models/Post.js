var keystone = require('keystone');
var keystoneStorage = require('keystone-storage-namefunctions');
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
	author: { type: Types.Relationship, ref: 'User', index: true },
	type: { type: Types.Select, options: 'work, lab, blog, page content', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, dependsOn: { type: ['work','lab'] }  },	
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	projectDate: { type: Types.Date, index: true, dependsOn: { type: ['work','lab'] } },	
	
	pageContentType: { type: Types.Select, options: 'main page, sub page', index: true, dependsOn: { type: 'page content' }   },
	whichMainPage: { type: Types.Select, options: 'home, work, lab, blog, contact', index: true, dependsOn: {pageContentType: 'main page' } },
	whichSubPage: { type: Types.Relationship, ref: 'PostCategory', dependsOn: {pageContentType: 'sub page' }},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, dependsOn: {type: ['work','lab'] } },
	
	video: {type: Types.Text },
	mainImage: { type: Types.CloudinaryImage, autoCleanup: true },
	images: {type: Types.CloudinaryImages, autoCleanup: true },		
	otherImages: {type: Types.CloudinaryImages, autoCleanup: true },
	otherImagesTitle:{type:Types.Text, dependsOn: {type: ['work','lab','blog'] } },
	featured: { type: Types.Boolean, label: 'Tick to make this a featured post', default: false,dependsOn: {type: ['work','lab'] } },
	relatedPosts: {type: Types.Relationship, ref: 'Post', many: true, dependsOn: {type: ['work','lab','blog'] }},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 80 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 },
		more: { type: Types.Html, wysiwyg: true, height: 80 },
		extra: { type: Types.Html, wysiwyg: true, height: 40, collapse:true, dependsOn: {type: ['work','lab','blog'] } },
		end: { type: Types.Html, wysiwyg: true, height: 40, collapse:true, dependsOn: {type: ['work','lab','blog'] } },
	},	
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
