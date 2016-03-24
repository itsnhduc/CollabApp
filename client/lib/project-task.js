if (Meteor.isClient) {

	Template.projectTask.events({
		'click .task-pill': function() {
			$("#task-modal").find(".modal-body").text($(this).find(".project-task-content").text());
			$("#task-modal").modal("show");
		},
		'click #submit-solution': function(event) {
			event.preventDefault();
			var solution = $('#solution').val();
			var hasEntry = TaskSolutions.findOne({projectId: this.projectId, taskId: this._id});

			if (hasEntry) {
				Meteor.call('addSolution', this.projectId, this._id, solution);
			} else {
				Meteor.call('saveSolution', this.projectId, this._id, solution);
			}

			$('#solution').val('');
		},
		'click .like': function() {
			if ($('.like').hasClass('liked')) {
				Meteor.call('likeSolution', this.projectId, this._id, 0);
				$('.like').removeClass('liked');
				$('.like-icon').removeClass('fa-thumbs-o-up');
				$('.like-icon').addClass('fa-thumbs-up');
			} else {
				Meteor.call('likeSolution', this.projectId, this._id, 1);
				$('.like').addClass('liked');
				$('.like-icon').removeClass('fa-thumbs-up');
				$('.like-icon').addClass('fa-thumbs-o-up');
			}
		}
	});

	Template.projectTask.helpers({
		'projectTitle': function() {
			return Projects.findOne(this.projectId).title;
		},
		'solutions': function() {
			var solutionPool = TaskSolutions.findOne({projectId: this.projectId, taskId: this._id}).solutions;
			for (var i = 0; i < solutionPool.length; i++) {
				var user = Meteor.users.findOne(solutionPool[i].userId);
				solutionPool[i].collabName = user.profile.firstName + ' ' + user.profile.lastName;
				solutionPool[i].projectId = this.projectId;
				solutionPool[i]._id = this._id;
				
				var hasLiked = solutionPool[i].likes.indexOf(Meteor.userId()) != -1;
				solutionPool[i].likeStatus = hasLiked ? 'liked' : '';
				solutionPool[i].icon = hasLiked ? 'fa-thumbs-up' : 'fa-thumbs-o-up';
				solutionPool[i].numOfLikes = solutionPool[i].likes.length;
			}
			return solutionPool;
		}
	});

}