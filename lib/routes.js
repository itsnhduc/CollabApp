Router.route('/', {
	name: 'home',
	template: 'home',
});
Router.route('/explore');
Router.route('/help');

Router.route('/login');
Router.route('/register');

Router.route('/project-discussion');
Router.route('/project-panel');
Router.route('/project-task');
Router.route('/project');

Router.route('/create-project-p1');
Router.route('/create-project-p2');
Router.route('/create-project-p3');
Router.route('/create-project-p4');
Router.route('/create-project-p5');

Router.configure({
	layoutTemplate: 'master'
});