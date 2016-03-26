if (Meteor.isClient) {

	Template.projectTask.solutionEntry = function() {
		return TaskSolutions.findOne({
			projectId: Session.get('projectId'), 
			taskId: Session.get('taskId')
		});
	}

	Template.projectTask.onRendered(function() {
		Session.set('projectId', this.data.projectId);
		Session.set('taskId', this.data._id);
	});

	Template.projectTask.events({
		'click .task-pill': function() {
			$("#task-modal").find(".modal-body").text($(this).find(".project-task-content").text());
			$("#task-modal").modal("show");
		},
		'click #submit-solution': function(event) {
			event.preventDefault();
			var solution = $('#solution').val();
			var entry = Template.projectTask.solutionEntry();

			if (entry) {
				Meteor.call('addSolution', this.projectId, this._id, solution);
			} else {
				Meteor.call('saveSolution', this.projectId, this._id, solution);
			}

			$('#solution').val('');
		},
		'click .like': function() {
			if ($('#like' + this._id).hasClass('liked')) {
				console.log(this);
				Meteor.call('likeSolution', this.projectId, this.taskId, this._id, 0);
				$('#like' + this._id).removeClass('liked');
				$('#like-icon' + this._id).removeClass('fa-thumbs-o-up');
				$('#like-icon' + this._id).addClass('fa-thumbs-up');
			} else {
				console.log(this);
				Meteor.call('likeSolution', this.projectId, this.taskId, this._id, 1);
				$('#like' + this._id).addClass('liked');
				$('#like-icon' + this._id).removeClass('fa-thumbs-up');
				$('#like-icon' + this._id).addClass('fa-thumbs-o-up');
			}
		}
	});

	Template.projectTask.helpers({
		'projectTitle': function() {
			return Projects.findOne(this.projectId).title;
		},
		'solutions': function() {
			var entry = Template.projectTask.solutionEntry();
			if (entry) {
				var solutionPool = entry.solutions;
				for (var i = 0; i < solutionPool.length; i++) {
					var user = Meteor.users.findOne(solutionPool[i].userId);
					solutionPool[i].collabName = user.profile.firstName + ' ' + user.profile.lastName;
					solutionPool[i].projectId = this.projectId;
					solutionPool[i].taskId = this._id;
					solutionPool[i]._id = i;
					
					var hasLiked = solutionPool[i].likes.indexOf(Meteor.userId()) != -1;
					solutionPool[i].likeStatus = hasLiked ? 'liked' : '';
					solutionPool[i].icon = hasLiked ? 'fa-thumbs-up' : 'fa-thumbs-o-up';
					solutionPool[i].numOfLikes = solutionPool[i].likes.length;
				}
				return solutionPool;
			} else {
				return [];
			}
		},
		'numOfSolutions': function() {
			var entry = Template.projectTask.solutionEntry();
			if (entry) {
				return entry.solutions.length;
			} else {
				return 0;
			}
		}
	});

}