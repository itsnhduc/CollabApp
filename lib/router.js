Router.route('/', {
	name: 'index',
	template: 'index'
});

Router.route('/explore');
Router.route('/project/:_id', {
	name: 'project',
	template: 'project',
	data: function() {
		return Projects.findOne(new Mongo.ObjectID(this.params._id));
	}
});
Router.route('/brainstorm/:_id', {
	name: 'brainstorm',
	template: 'brainstorm',
	data: function() {
		return Projects.findOne(new Mongo.ObjectID(this.params._id));
	}
});

Router.configure({
	layoutTemplate: 'master'
});

// temporary routes
Router.route('/create-project');
Router.route('/authentication');