if (Meteor.isClient) {

	Template.explore.helpers({
		'projects': function() {
			return Projects.find();
		}
	});

}