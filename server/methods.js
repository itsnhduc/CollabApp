if (Meteor.isServer) {

	Meteor.methods({
		'incLike': function(projectId, taskId, offset) {
			var solutionPool = TaskSolutions.findOne({projectId: projectId, taskId: taskId}).solutions;
			solutionPool[taskId].likes += offset;
			TaskSolutions.update({projectId: projectId, taskId: taskId}, {$set: {
				solutions: solutionPool
			}});
		}
	});

}