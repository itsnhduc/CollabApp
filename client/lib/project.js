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
	});

	Template.project.events({
		'click .task-well': function(event) {
			event.preventDefault();
			var curPath = window.location.pathname;
			if (curPath[curPath.length - 1] == '/') {
				curPath = curPath.substring(0, curPath.length - 1);
			}
			Router.go(curPath + '/task/' + this._id);
		},
		'click #submit-new-topic': function(event) {
			event.preventDefault();

			var topicTitle = $('#new-topic-title').val();
			var postContent = $('#new-initial-post').val();
			var projectId = this._id;

			Meteor.call('newDiscussion', projectId, topicTitle, postContent);

			$('#new-topic-title').val('');
			$('#new-initial-post').val('');
		},
		'click .topic': function() {
			console.log(this);
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
			var solutionPool = TaskSolutions.find({projectId: this._id}).fetch();
			for (var i = 0; i < taskPool.length; i++) {
				taskPool[i]._id = i;
				if (solutionPool[i]) {
					taskPool[i].numOfSolutions = solutionPool[i].solutions.length;
				} else {
					taskPool[i].numOfSolutions = 0;
				}
			}
			return taskPool;
		},
		'topics': function() {
			var topicPool = Discussions.findOne({projectId: this._id}).topics;
			for (var i = 0; i < topicPool.length; i++) {
				var curTopic = topicPool[i];
				var authorRecord = Meteor.users.findOne(curTopic.authorId);
				topicPool[i].authorName = authorRecord.profile.firstName + ' ' + authorRecord.profile.lastName;
				var discussionPostsEntry = DiscussionPosts.findOne({projectId: this._id, topicId: i});
				if (discussionPostsEntry) {
					topicPool[i].postCount = discussionPostsEntry.posts.length;
				} else {
					topicPool[i].postCount = 0;
				}
				var created = Math.floor(((new Date()).getTime() - curTopic.createdAt.getTime()) / 1000 / 60); // problem: non-reactive
				if (created == 0) {
					created = 'Just now';
				} else if (created < 60) {
					created += ' minutes ago';
				} else {
					created = Math.floor(created / 60);
					if (created < 24) {
						created = Math.floor(created / 60) + ' hours ago';
					} else {
						created = Math.floor(created / 60 / 24) + ' days ago';
					}
				}
				topicPool[i].created = created;
				topicPool[i]._id = i;
			}
			return topicPool;
		}
	});

}