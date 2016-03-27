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
		'newProject': function(title, description, category, collabs, tasks) {
			Projects.insert({
				title: title,
				description: description,
				category: category,
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
					Meteor.call('saveCollabs', _id, collabs);
					Meteor.call('saveTasks', _id, tasks);
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
		'likeSolution': function(projectId, taskId, solutionId, isLike) {
			var solutionPool = TaskSolutions.findOne({projectId: projectId, taskId: taskId}).solutions;
			if (isLike) {
				solutionPool[solutionId].likes.push(Meteor.userId());
			} else {
				var position = solutionPool[solutionId].likes.indexOf(Meteor.userId());
				if (position != -1) {
					solutionPool[solutionId].likes.splice(position, 1);
				}
			}
			TaskSolutions.update({projectId: projectId, taskId: taskId}, {$set: {
				solutions: solutionPool
			}});
		},
        'newDiscussion': function(projectId, title, postContent) {
            var topicEntry = Discussions.findOne({projectId: projectId});
            if (topicEntry) {
                Discussions.update({projectId: projectId}, {$addToSet: {
                    topics: {
                        title: title,
                        authorId: Meteor.userId(),
                        views: 0,
                        createdAt: new Date()
                    }
                }});
                Meteor.call('addPost', projectId, topicEntry.topics.length, postContent);
            } else {
                Discussions.insert({
                    projectId: projectId,
                    topics: [{
                        title: title,
                        authorId: Meteor.userId(),
                        views: 0,
                        createdAt: new Date()
                    }]
                });
                Meteor.call('addPost', projectId, 0, postContent);
            }
        },
        'addPost': function(projectId, topicId, content) {
            var discussionPostEntry = DiscussionPosts.findOne({projectId: projectId, topicId: topicId});
            if (discussionPostEntry) {
                DiscussionPosts.update({projectId: projectId, topicId: topicId}, {$addToSet: {
                    posts: {
                        userId: Meteor.userId(),
                        content: content,
                        createdAt: new Date()
                    }
                }});
            } else {
                DiscussionPosts.insert({
                    projectId: projectId,
                    topicId: topicId,
                    posts: [{
                        userId: Meteor.userId(),
                        content: content,
                        createdAt: new Date()
                    }]
                });
            }
        }
	});

}