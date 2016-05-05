if (Meteor.isClient) {
	
	var addToSelector = function(key, value) {
		var selector = Session.get('selector');
		if ((value == 'any' || value == 'all') && selector[key] != undefined) {
			delete selector[key];
		} else {
			selector[key] = value;
		}
		Session.set('selector', selector);
	}
	
	$(document).on('change','#project-stage',function(){
		var selectedStage = this.value.toLowerCase();
		addToSelector('stage', selectedStage);
	});
	
	$(document).on('change','#sort',function(){
		var sortOption = this.value;
		switch (sortOption) {
			case 'Newest':
				Session.set('sorter', {createdAt: 1});
			case 'Title':
				Session.set('sorter', {title: 1});
				break;
			case 'Most viewed':
				Session.set('sorter', {views: -1});
				break;
			default:
		}
	});
	
	Template.explore.onRendered(function() {
		var screen_height = $(window).height();
        var navbar_content_height = $('.navbar').height();
        var content_height = screen_height - navbar_content_height;
        $('#left-panel').css('height', content_height + 'px');
        $('#right-panel').css('height', content_height + 'px');
        $('#left-panel').css('max-height', content_height + 'px');
        $('#right-panel').css('max-height', content_height + 'px');
		Session.set('selector', {});
		Session.set('sorter', {createdAt: -1});
		

	});

	Template.explore.helpers({
		'projects': function() {
			return Projects.find(Session.get('selector'), {sort: Session.get('sorter')}).fetch();
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
			var selected = event.target.getAttribute('value').toLowerCase();
			addToSelector('category', selected);
		}
	});

}