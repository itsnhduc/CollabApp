if (Meteor.isClient) {
	
	
	
	Template.explore.onRendered(function() {
		var screen_height = $(window).height();
        var navbar_content_height = $('.navbar').height();
        var content_height = screen_height - navbar_content_height;
        $('#left-panel').css('height', content_height + 'px');
        $('#right-panel').css('height', content_height + 'px');
        $('#left-panel').css('max-height', content_height + 'px');
        $('#right-panel').css('max-height', content_height + 'px');
		Session.set('selector', {});
	});

	Template.explore.helpers({
		'projects': function() {
			return Projects.find(Session.get('selector')).fetch();
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
		},
		'click .cat-btn': function(event) {
			$('.cat-btn.active').removeClass('active');
			var selected = event.target.getAttribute('value');
			if (selected == 'All') {
				Session.set('selector', {});
			} else {
				Session.set('selector', { category: selected });
			}
		}
	});

}