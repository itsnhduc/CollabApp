if (Meteor.isServer) {

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
		'addProject': function(title, description) {
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
					likes: 0
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
					likes: 0
				}]
			});
		},
		'incLike': function(projectId, taskId, offset) {
			var solutionPool = TaskSolutions.findOne({projectId: projectId, taskId: taskId}).solutions;
			solutionPool[taskId].likes += offset;
			TaskSolutions.update({projectId: projectId, taskId: taskId}, {$set: {
				solutions: solutionPool
			}});
		}
	});

}