if (Meteor.isClient) {

	Template.explore.helpers({
		'projects': function() {
			return Projects.find();
		},
		'labelType': function() {
			var stage = this.stage;
			if (stage == 'project') {
				return 'label-success';
			} else if (stage == 'brainstorm') {
				return 'label-warning';
			} else {
				console.log('Error');
			}
		}
	});

	Template.explore.events({
		'click .project': function() {
			var stage = this.stage;
			if (stage == 'project') {
				Router.go('/project/' + this._id);
			} else if (stage == 'brainstorm') {
				Router.go('/brainstorm/' + this._id);
			} else {
				console.log('Error');
			}
		},
		'click #new': function(event) {
			event.preventDefault();
			if (Meteor.user()) {
				Router.go('/new-project');
			} else {
				Router.go('/authentication');
			}
		}
	});

}