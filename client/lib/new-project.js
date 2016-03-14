if (Meteor.isClient) {

	var maxStep;
	var step;

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
				
				// save project info

				setTimeout(function(){
					// Router.go('');
				}, 3000);
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

	})

}