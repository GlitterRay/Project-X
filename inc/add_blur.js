var filesData = [];
var uploadingFilesSz = {};
var blurData = [];
var doBlur = true;

var THEME = 'http://givi.my.ge/myauto/templates/';
BlurConfig = {};
BlurConfig.uploadedImageCnt = 0;

function addImages(Images) {
	BlurConfig.uploadedImageCnt = Images.length; // For extension only

	$('body').append('<div id="__count__">' + BlurConfig.uploadedImageCnt + '</div>');

	$("#blur-images-holder").addClass('hasImages');

	for (var i = 0; i < Images.length; i++) {
		var item = '<div class="blur-image-one"><img src="' + Images[i].replace(/thumbs/, 'large')  + '" data-src="' + Images[i] + '" />';

		item += '<div class="blur-image-one-overlay">';
		item += '<div class="blur-image-one-header">';
		item += '<div class="blur-image-one-main"><img src="' + THEME + 'assets/img/icons/main_icon.png" /><span class="inner-text">მთავარი ფოტო</span></div>';
		item += '<div class="blur-image-one-blur"><img src="' + THEME + 'assets/img/icons/blur_icon.png" /><span class="inner-text">დაფარული ნომერი</span></div>';
		item += '</div>';
		item += '<div class="blur-image-one-footer"><div class="blur-image-one-main"><img src="' + THEME + 'assets/img/icons/main_icon.png" /></div><div class="blur-image-one-remove"></div></div>';
		item += '</div>';
		item += '</div>'; //<img style="display:none" class="ajax" src="' + Images[i].replace(/thumbs/, 'large') + '" />

		$(item).insertBefore( $("#blur-images-holder") );
	}

	$($('.blur-image-one')[0]).addClass('is_main');

	configureOverlay();

	finishDrag();

	$(".add-blur-text .left-image-count").text('კიდევ ' + (15 - BlurConfig.uploadedImageCnt) + ' ცალი');

	if (BlurConfig.uploadedImageCnt == 15) $('#blur-images-holder').addClass('hidden');
	$("#blur-start-blur-holder").removeClass('hidden');
}

function configureOverlay()
{
	$('.blur-image-one-footer .blur-image-one-main').unbind('click').click(function () {
		$('.is_main').removeClass('is_main');

		$(this).parents('.blur-image-one').addClass('is_main');

		if ($('.blur-image-one')[0] != $(this).parents('.blur-image-one')) {
			var holder = $('#blur-images-drop-area')[0];

			var _this = $(this).parents('.blur-image-one')[0];
			var _that = $('.blur-image-one')[0];

			$(_this).fadeOut(function () {
				holder.insertBefore(_this, _that);

				$(_this).fadeIn();
			});
		}
	});

	$('.blur-image-one .blur-image-one-remove').unbind('click').click(function () {
		if ($(this).parents('.blur-image-one').hasClass('is_main')) {
			$($('.blur-image-one')[0]).addClass('is_main');
		}

		$(this).parents('.blur-image-one').remove();

		BlurConfig.uploadedImageCnt--;

		$(".add-blur-text .left-image-count").text('კიდევ ' + (15 - BlurConfig.uploadedImageCnt) + ' ცალი');

		$('#blur-images-holder').removeClass('hidden');
	});
}

function finishDrag() {
	$(".add-blur-text").find('.images-blur-dragging').addClass('hidden');
	$(".add-blur-text").find('.add_blur_trigger, .images-blur').removeClass('hidden');
}