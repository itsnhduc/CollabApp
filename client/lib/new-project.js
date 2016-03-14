if (Meteor.isClient) {

	var maxStep;
	var step;

	Session.setDefault('collabs', [{_id: 1}])

	Template.newProject.onRendered(function() {
		maxStep = 4;
		step = 1;
		for (var i = 2; i <= maxStep; i++) {
			$('.step' + i).hide();
		}
		$('.prev').hide();
	});

	Template.newProjectP2.helpers({
		'collabs': function() {
			// return collabs;
			return Session.get('collabs');
		}
	});

	Template.newProjectP2.events({
		'click .add-collab': function(event) {
			event.preventDefault();
			var collabs = Session.get('collabs');
			var nextId = collabs[collabs.length - 1]._id + 1;
			collabs.push({
				_id: nextId
			});
			Session.set('collabs', collabs);
		},
		'click .remove-collab': function(event) {
			event.preventDefault();
			var curId = this._id;
			var collabs = Session.get('collabs');
			collabs = $.grep(collabs, function(value) {
				return value._id != curId;
			});
			Session.set('collabs', collabs);
		}
	});

	Template.newProject.events({
		'click .next': function(event) {
			event.preventDefault();
			$('.step' + step).hide();
			$('.step' + (step + 1)).show();
			if (step == 1) {
				$('.prev').show();
			} else if (step == maxStep - 1) {
				$('.prev').hide();
				$('.next').hide();
				
				// save project info
				// var title = $('#project-title').val();
				// var description = $('#project-description').val();
				// ---> image
				// var collaborators = [];
				// var tasks = [];

				// setTimeout(function(){
				// 	Router.go('');
				// }, 3000);
			}
			step++;
		},
		'click .prev': function(event) {
			event.preventDefault();
			$('.step' + step).hide();
			$('.step' + (step - 1)).show();
			if (step == 2) {
				$('.prev').hide();
			}
			step--;
		},

	});

}