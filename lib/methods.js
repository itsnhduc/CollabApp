if (Meteor.isServer) {
	Meteor.methods({
		addProject: function(name, description, collaborators, tools) {
			var wrap = {
				name: name,				// project name 			[string]
				desc: description,		// project description		[string]
				collab: collaborators,	// initial collaborators	[array of string]
				createdAt: new Date(), 	// date created 			[Date]
				tools: tools			// intial tools included 	[array of string]
			};
			Projects.insert(wrap);
		},
		deleteProject: function(id) {
			Projects.remove(id);
		},
		editProject: function(id, name, description, collaborators, tools) {
			var wrap = {
				_name: name,			// project name 			[string]
				_desc: description,		// project description 		[string]
				_collab: collaborators,	// initial collaborators 	[array of string]
				_createdAt: new Date(), // date created 			[Date]
				_tools: tools			// intial tools included 	[array of string]
			};
			Meteor.users.update(id, wrap);
		},

		addAccount: function(firstName, lastName, username, email, role, acceptMailing) {
			var wrap = {
				firstName: firstName, 			// first name [string]
				lastName: lastName,				// last name [string]
				username: username, 			// username [string]
				email: email, 					// email [string]
				createdAt: new Date(), 			// date created [Date]
				role: role, 					// role [string]
				acceptMailing: acceptMailing, 	// opt for newsletter [bool]
				isActivated: false,				// if account is activated [bool]
			};
			Meteor.users.insert(wrap);
		},
		deleteAccount: function(id) {
			Meteor.users.remove(id);
		},
		editAccount: function(id, firstName, lastName, username, email, role, acceptMailing) {
			var wrap = {
				firstName: firstName, 			// first name [string]
				lastName: lastName,				// last name [string]
				username: username, 			// username [string]
				email: email, 					// email [string]
				createdAt: new Date(), 			// date created [Date]
				role: role, 					// role [string]
				acceptMailing: acceptMailing, 	// opt for newsletter [bool]
				isActivated: false,				// if account is activated [bool]
			};
			Meteor.users.update(id, wrap);
		}
	});
}