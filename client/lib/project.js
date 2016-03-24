if (Meteor.isClient) {

	Template.project.onRendered(function() {
		$('.owl-carousel').owlCarousel({
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});
		if (screen.width < 992) {
			$('.owl-carousel').hide();
			$('.comment-post-left').hide();
			$('.comment-post-profile-pic').show();
		} else {
			$('.owl-carousel').show();
			$('.comment-post-left').show();
			$('.comment-post-profile-pic').hide();
		};
		// Session.set('activeImg', 1);
	});

	Template.project.events({
		'click .task-well': function(event) {
			event.preventDefault();
			Router.go(window.location.pathname + '/task/' + this._id);
		}
	});

	Template.project.helpers({
		'collabs': function() {
			var collabPool = Collabs.findOne({projectId: this._id}).collabs;
			for (var i = 0; i < collabPool.length; i++) {
				var curCollab = collabPool[i];
				var userRecord = Meteor.users.findOne({username: curCollab.username});
				collabPool[i].name = userRecord.profile.firstName + ' ' + userRecord.profile.lastName;
			}
			return collabPool;
		},
		'tasks': function() {
			var taskPool = Tasks.findOne({projectId: this._id}).tasks;
			for (var i = 0; i < taskPool.length; i++) {
				taskPool[i]._id = i;
			}
			return taskPool;
		}
	});

}