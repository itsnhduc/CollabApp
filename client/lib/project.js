if (Meteor.isClient) {

	Template.project.onRendered(function() {
		$('.owl-carousel').owlCarousel({
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});
		Session.set('activeImg', 1);
	});

	Template.project.events({
		// 'click .left.carousel': function(event) {
		// 	event.preventDefault();
		// 	var nextImg = $('.inactive-img-' + Session.get('activeImg') - 1).attr('src');
		// 	var curImg = $('.active-img').attr('src');
		// 	$('active-img').attr('src', nextImg);
			
		// }
	});

}