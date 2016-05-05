if (Meteor.isClient) {

	Template.authentication.events({
		'click .login-submit': function(event) {
			event.preventDefault();
			var username = $('.login-username').val();
			var password = $('.login-password').val();
			Meteor.loginWithPassword(username, password, function(err) {
				if (err) {
					$('.login-alert').text(err.reason);
					$('.login-alert').removeClass('hidden');
					throw new Meteor.Error(err);
				} else {
					// Router.go('/explore');
					$('#login').modal('toggle');
				}
			});
		},
		'click .register-submit': function(event) {
			event.preventDefault();
			var firstName = $('.register-firstname').val();
			var lastName = $('.register-lastname').val();
			var email = $('.register-email').val();
			var username = $('.register-username').val();
			var password = $('.register-password').val();
			var reentPassword = $('.register-reentpassword').val();
			if (password == reentPassword) {
				Meteor.call('createNewUser', email, username, password, firstName, lastName, function(err) {
					if (err) {
						$('.register-alert').text(err.reason);
						$('.register-alert').removeClass('hidden');
						throw new Meteor.Error(err);
					} else {
						// Router.go('/explore');
						$('#register').modal('toggle');
					}
				});
				Meteor.loginWithPassword(username, password);
			} else {
				$('.register-alert').text('Passwords unmatched');
				$('.register-alert').removeClass('hidden');
				throw new Meteor.Error('Passwords unmatched');
			}
		}
	});

}