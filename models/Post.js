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
	title: { type: String, required: true, index: true },
	author: { type: Types.Relationship, ref: 'User' },
	type: { type: Types.Select, options: 'work, lab, blog, page content, page paragraph', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, dependsOn: { type: ['work','lab','blog','page paragraph'] }  },	
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },	
	pageType: { type: Types.Select, options: 'main page, sub page', index: true, dependsOn: { type: ['page content','page paragraph'] }},
	whichMainPage: { type: Types.Select, options: 'home, work, lab, blog, contact', index: true, dependsOn: {pageType: 'main page' } },
	whichSubPage: { type: Types.Relationship, ref: 'PostCategory', index: true, dependsOn: {pageType: 'sub page' }, note: 'SAVE and REFRESH if you change this field to get correct filtered posts in "Posts Order"'},
	backgroundColor: { type: Types.Select, options: 'black, dark-grey, grey, light-grey, white', dependsOn: {type: 'page paragraph' } },
	categories: { type: Types.Relationship, ref: 'PostCategory', index: true, many: true, dependsOn: {type: ['work','lab'] }},
	featured: { type: Types.Boolean, label: 'Tick to make this project the poster project for its first category', index: true, default: false,dependsOn: {type: ['work','lab'] } },
	client: {type: Types.Text, dependsOn: {type: ['work','lab'] } },
	location: {type: Types.Text, dependsOn: {type: ['work','lab'] } },
	video: {type: Types.Text, index: true },
	videoQuality: { type: Types.Select, options: 'auto, 4K, 2K, 1080p, 720p, 540p, 360p', default: 'auto', index: true },
	videoAspectRatio: { type: Types.Select, options: '16/9 landscape, 9/16 portrait, 4/3', default: '16/9 landscape', index: true },
	mainImage: { type: Types.CloudinaryImage, autoCleanup: true, index: true },
	mainImageCrop: { type: Types.Select, options: 'north, center, south', index: true, default: 'center', note: 'When image is cropped, set where crop starts: North shows top part, center the middle & south the bottom of picture.'},
	mainImageShow: { type: Types.Boolean, label: 'Tick to show main image in the project page when there is no video', default: true, dependsOn: {type: ['work','lab','blog'] } },
	images: {type: Types.CloudinaryImages, autoCleanup: true },		
	otherImages: {type: Types.CloudinaryImages, autoCleanup: true,dependsOn: {type: ['work','lab','blog','page content'] }  },
	otherImagesTitle:{type:Types.Text, dependsOn: {type: ['work','lab','blog'] } },

	postsOrder: {type: Types.Relationship, ref: 'Post', filters: {categories: ':whichSubPage', state:'published'},many: true, dependsOn: {pageType: ['sub page'] },note: 'By default, posts are ordered by date. Use this list to feature important posts first. Posts in this list will appear first and in the order they are in the list, then any posts not in this list will be shown after, ordered by date.'},
	relatedPosts: {type: Types.Relationship, ref: 'Post', filters: {type: ':type'}, many: true, note: 'Only relate projects in the same 1st category, because no way to filter per category, only categories.',dependsOn: {type: ['work','lab','blog'] }},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 50 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 },
		more: { type: Types.Html, wysiwyg: true, height: 80 ,dependsOn: {type: ['work','lab','blog','page content']}},
		extra: { type: Types.Html, wysiwyg: true, height: 40, collapse:true, dependsOn: {type: ['work','lab','blog','page content'] } },
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
