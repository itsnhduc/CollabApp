if (Meteor.isClient) {
	
	var maxStep;
	var step;

	// >>>>>>>>>> STEP 2
	Session.setDefault('collabs', [{_id: 1}])

	Template.newProjectP2.onRendered(function() {
		$('.collab-name').first().val('You');
		$('.collab-name').first().attr('disabled', 'disabled');
	});

	Template.newProjectP2.helpers({
		'collabs': function() {
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
	// >>>>>>>>>> /STEP 2

	// >>>>>>>>>> STEP 3
	Session.setDefault('tasks', [{_id: 1}]);

	Template.newProjectP3.helpers({
		'tasks': function() {
			return Session.get('tasks');
		}
	});

	Template.newProjectP3.events({
		'click .add-task': function(event) {
			event.preventDefault();
			var tasks = Session.get('tasks');
			var nextId = tasks[tasks.length - 1]._id + 1;
			tasks.push({
				_id: nextId
			});
			Session.set('tasks', tasks);
		},
		'click .remove-task': function(event) {
			event.preventDefault();
			var curId = this._id;
			var tasks = Session.get('tasks');
			tasks = $.grep(tasks, function(value) {
				return value._id != curId;
			});
			Session.set('tasks', tasks);
		},
		'click .save-task': function(event) {
			var taskTitle = $('#new-project-task-' + this._id).find('#task-title').val();
			$('#task-' + this._id).find('.title').text(taskTitle);
			$('#new-project-task-' + this._id).modal('toggle');
		}
	});

	// >>>>>>>>>> /STEP 3

	Template.newProject.onRendered(function() {
		maxStep = 4;
		step = 1;
		for (var i = 2; i <= maxStep; i++) {
			$('.step' + i).hide();
		}
		$('.prev').hide();
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
				
				// Save project info
				var title = $('#project-title').val();
				var description = $('#project-description').val();
				var projectId;

				Meteor.call('addProject', title, description, function (err, _id) {
					 saveCollaborators(_id);
					 saveTasks(_id);
					 Router.go('/project/' + _id)
				});

				// ---> image

				var saveCollaborators = function (_id) {
					var collabs = [];
					var collabPool = $('.individual-collab');
					var nameList = collabPool.find('.collab-name');
					var roleList = collabPool.find('.collab-role');

					for (var i = 0; i < collabPool.length; i++) {
						var username = nameList[i].value;
						if (username == 'You') {
							username = Meteor.user().username;
						}
						collabs.push({
							username: username,
							role: roleList[i].value
						});
					}

					Meteor.call('saveCollabs', _id, collabs);
				}

				var saveTasks = function(_id) {
					var tasks = []
					var taskPool = $('.modal');
					var titleList = taskPool.find('#task-title');
					var descriptionList = taskPool.find('#task-description');
					
					for (var i = 0; i < taskPool.length; i++) {
						tasks.push({
							title: titleList[i].value,
							description: descriptionList[i].value
						});
					}

					Meteor.call('saveTasks', _id, tasks);
				}
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