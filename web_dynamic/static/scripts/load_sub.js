// wait for the DOM load
$(document).ready(function () {
	$('#drp').on('click', 'li', function() {
		const subId = $(this).attr('sub-id');
		console.log(subId);
	});
});
