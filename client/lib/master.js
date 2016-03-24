if (Meteor.isClient) {

	Template.master.events({
		'click .logout': function(event) {
			event.preventDefault();
			Meteor.logout(function(err) {
				if (err) {
					throw new Meteor.Error(err.message);
				} else {
					Router.go('/authentication');
				}
			})
		}
	});

}