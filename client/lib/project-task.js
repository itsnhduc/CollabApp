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
				Meteor.call('incLike', this.projectId, this._id, -1);
				$('.like').removeClass('liked');
			} else {
				Meteor.call('incLike', this.projectId, this._id, 1);
				$('.like').addClass('liked');
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
			}
			return solutionPool;
		}
	});

}