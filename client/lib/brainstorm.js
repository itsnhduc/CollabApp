if (Meteor.isClient) {

	Template.brainstorm.onRendered(function() {
		$('.owl-carousel').owlCarousel({
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});
		jQuery.each(jQuery('textarea[data-autoresize]'), function() {
			var offset = this.offsetHeight - this.clientHeight;
			var resizeTextarea = function(el) {
					jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
			};
			jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
		});
	});

}