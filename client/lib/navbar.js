if (Meteor.isClient) {
	Template.master.helpers({
		homeActive: function() {
			if (Router.current().route.getName() == 'home') return 'active';
			else return '';
		},
		exploreActive: function() {
			if (Router.current().route.getName() == 'explore') return 'active';
			else return '';
		},
		helpActive: function() {
			if (Router.current().route.getName() == 'help') return 'active';
			else return '';
		},
		loginActive: function() {
			if (Router.current().route.getName() == 'login') return 'active';
			else return '';
		},
		registerActive: function() {
			if (Router.current().route.getName() == 'register') return 'active';
			else return '';
		}
	});
}