$(document).ready(function() {
	$('#created-by').text(localStorage.getItem('currentUser'));
});

$(document).on('click', '#button-create', function() {
	$('#created-prompt').fadeIn(500, () => {
		setTimeout(() => {
			$('#created-prompt').fadeOut(500);
		}, 2000);
	});
});