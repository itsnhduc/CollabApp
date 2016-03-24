if (Meteor.isServer) {

	var newProjectId;

	Meteor.methods({
		'createNewUser': function(email, username, password, firstName, lastName) {
			Accounts.createUser({
				email: email,
				username: username,
				password: password,
				profile: {
					firstName: firstName,
					lastName: lastName
				},
				createdAt: new Date()
			});
		},
		'newProject': function(title, description, collabs, tasks) {
			Projects.insert({
				title: title,
				description: description,
				author: Meteor.user().username,
				stage: 'project',
				stats: {
					views: 0,
					stars: 0,
				},
				// category: category,
				// tags: [],
				createdAt: new Date()
			}, function(err, _id) {
				if (err) {
					throw new Meteor.Error(err);
				} else {
					Meteor.call('saveCollabs', _id, collabs, function(err) {
						if (err) {
							throw new Meteor.Error(err);
						}
					});
					Meteor.call('saveTasks', _id, tasks, function(err) {
						if (err) {
							throw new Meteor.Error(err);
						}
					});
				}
			});
		},
		'saveCollabs': function(projectId, collabs) {
			Collabs.insert({
				projectId: projectId,
				collabs: collabs
			});
		},
		'saveTasks': function(projectId, tasks) {
			Tasks.insert({
				projectId: projectId,
				tasks: tasks
			});
		},
		'addSolution': function(projectId, taskId, solutionText) {
			TaskSolutions.update({projectId: projectId, taskId: taskId}, {$addToSet: {
				solutions: {
					userId: Meteor.userId(),
					text: solutionText,
					likes: []
				}
			}});
		},
		'saveSolution': function(projectId, taskId, solutionText) {
			TaskSolutions.insert({
				projectId: projectId,
				taskId: taskId,
				solutions: [{
					userId: Meteor.userId(),
					text: solutionText,
					likes: []
				}]
			});
		},
		'likeSolution': function(projectId, taskId, isLike) {
			var solutionPool = TaskSolutions.findOne({projectId: projectId, taskId: taskId}).solutions;
			if (isLike) {
				solutionPool[taskId].likes.push(Meteor.userId());
			} else {
				var position = solutionPool[taskId].likes.indexOf(Meteor.userId());
				if (position != -1) {
					solutionPool[taskId].likes.splice(position, 1);
				}
			}
			TaskSolutions.update({projectId: projectId, taskId: taskId}, {$set: {
				solutions: solutionPool
			}});
		}
	});

}