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
	type: { type: Types.Select, options: 'work, lab, blog, page content, page paragraph', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, dependsOn: { type: ['work','lab','page paragraph'] }  },	
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	projectDate: { type: Types.Date, index: true, dependsOn: { type: ['work','lab'] } },	
	
	pageType: { type: Types.Select, options: 'main page, sub page', index: true, dependsOn: { type: ['page content','page paragraph'] }   },
	whichMainPage: { type: Types.Select, options: 'home, work, lab, blog, contact', index: true, dependsOn: {pageType: 'main page' } },
	whichSubPage: { type: Types.Relationship, ref: 'PostCategory', dependsOn: {pageType: 'sub page' }},
	backgroundColor: { type: Types.Select, options: 'black, dark-grey, grey, light-grey, white', index: true, dependsOn: {type: 'page paragraph' } },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, dependsOn: {type: ['work','lab'] } },
	featured: { type: Types.Boolean, label: 'Tick to make this project the poster project for its first category', default: false,dependsOn: {type: ['work','lab'] } },
	video: {type: Types.Text },
	mainImage: { type: Types.CloudinaryImage, autoCleanup: true },
	images: {type: Types.CloudinaryImages, autoCleanup: true },		
	otherImages: {type: Types.CloudinaryImages, autoCleanup: true,dependsOn: {type: ['work','lab','blog','page content'] }  },
	otherImagesTitle:{type:Types.Text, dependsOn: {type: ['work','lab','blog'] } },
	
	relatedPosts: {type: Types.Relationship, ref: 'Post', many: true, dependsOn: {type: ['work','lab','blog'] }},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 80 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 },
		more: { type: Types.Html, wysiwyg: true, height: 80 ,dependsOn: {type: ['work','lab','blog','page content']}},
		extra: { type: Types.Html, wysiwyg: true, height: 40, collapse:true, dependsOn: {type: ['work','lab','blog'] } },
		end: { type: Types.Html, wysiwyg: true, height: 40, collapse:true, dependsOn: {type: ['work','lab','blog'] } },
	},	
	link: {
		destination: {type: Types.Text, dependsOn: {type: ['page paragraph'] }  },
		text: {type: Types.Text, dependsOn: {type: ['page paragraph'] }  },
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
