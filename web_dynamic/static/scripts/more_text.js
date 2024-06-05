// wait for DOM
$(document).ready(function () {
	// handle more click event
	$(document).on('click', '.more-link', function() {
		const $this = $(this);
		const $moreText = $this.siblings('p').children('.more-text');

	if ($moreText.is(':visible')) {
		$moreText.hide();
		$this.text('...More');
	} else {
		$moreText.show();
		$this.text('Less');
	}	
	});
});
