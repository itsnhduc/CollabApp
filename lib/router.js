Router.route('/', {
	name: 'index',
	template: 'index'
});

Router.route('/explore');

Router.configure({
	layoutTemplate: 'master'
});