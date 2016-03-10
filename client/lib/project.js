if (Meteor.isClient) {

	Template.project.onRendered(function() {
		$('.owl-carousel').owlCarousel({
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});
	});

}