if (Meteor.isClient) {

	Template.brainstorm.onRendered(function() {
		$('.owl-carousel').owlCarousel({
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});
		if (screen.width < 992) {
			$('.owl-carousel').hide();
			$('.comment-post-left').hide();
			$('.comment-post-profile-pic').show();
		} else {
			$('.owl-carousel').show();
			$('.comment-post-left').show();
			$('.comment-post-profile-pic').hide();
		};
		jQuery.each(jQuery('textarea[data-autoresize]'), function() {
			var offset = this.offsetHeight - this.clientHeight;
			var resizeTextarea = function(el) {
					jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
			};
			jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
		});
	});

	Template.brainstorm.helpers({
		'authorName':function() {
			return Accounts.findUserByUsername(this.author);
		}
	});

}