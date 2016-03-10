if (Meteor.isClient) {

	Template.authentication.events({
		'click .login-submit': function(event) {
			event.preventDefault();
			var email = $('.login-email').val();
			var password = $('.login-password').val();
			Meteor.loginWithPassword(email, password, function(err) {
				if (err) {
					$('.login-alert').text(err.reason);
					$('.login-alert').removeClass('hidden');
					throw new Meteor.Error(err);
				} else {
					Router.go('/explore');
				}
			});
		},
		'click .register-submit': function(event) {
			event.preventDefault();
			var firstName = $('.register-firstname').val();
			var lastName = $('.register-lastname').val();
			var email = $('.register-email').val();
			var password = $('.register-password').val();
			var reentPassword = $('.register-reentpassword').val();
			if (password == reentPassword) {
				Accounts.createUser({
					email: email,
					password: password,
					profile: {
						firstName: firstName,
						lastName: lastName
					},
					createdAt: new Date()
				}, function(err) {
					if (err) {
						$('.register-alert').text(err.reason);
						$('.register-alert').removeClass('hidden');
						throw new Meteor.Error(err);
					} else {
						Router.go('/explore');
					}
				});
			} else {
				$('.register-alert').val('Passwords unmatched');
				$('.register-alert').removeClass('hidden');
				throw new Meteor.Error('Passwords unmatched');
			}
		}
	});

}