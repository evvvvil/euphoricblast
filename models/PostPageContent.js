/*var keystone = require('keystone');

var PostPageContent = new keystone.List('PostPageContent', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostPageContent.add({
	name: { type: String, required: true },
});

PostPageContent.relationship({ ref: 'Post', path: 'posts', refPath: 'pageContent' });

PostPageContent.register();*/
