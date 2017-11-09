$(document).ready(function() {
	$('#created-by').text(localStorage.getItem('username'));
});

$(document).on('click', '#button-create', function() {
	$('#created-prompt').fadeIn(500, () => {
		setTimeout(() => {
			$('#created-prompt').fadeOut(500);
		}, 2000);
	});
});

$(document).on('change', "input[name='ticket-type']", function() {
	if ($(this).attr('id') == 'ticket-followup') {
		$('#followup-id').show();
	}
	else {
		$('#followup-id').hide();
	}
});