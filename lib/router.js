Router.route('/', {
	name: 'index',
	template: 'index'
});

Router.route('/explore');

Router.route('/new-project');

Router.route('/project/:_id', {
	name: 'project',
	template: 'project',
	data: function() {
		return Projects.findOne(this.params._id);
	}
});
Router.route('/brainstorm/:_id', {
	name: 'brainstorm',
	template: 'brainstorm',
	data: function() {
		return Projects.findOne(this.params._id);
	}
});

Router.route('/project/:_id/discussion', {
	name: 'projectDiscussion',
	template: 'projectDiscussion',
	data: function() {
		return Discussions.findOne({projectId: this.params._id});
	}
});
Router.route('/project/:_id/task/:_tid', {
	name: 'projectTask',
	template: 'projectTask',
	data: function() {
		var task = Tasks.findOne({projectId: this.params._id}).tasks[this.params._tid];
		task.projectId = this.params._id;
		task._id = this.params._tid;
		return task;
	}
});

Router.configure({
	layoutTemplate: 'master'
});