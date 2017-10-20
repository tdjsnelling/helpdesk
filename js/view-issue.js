$(document).on('click', '#button-edit', function() {
	$('input[type="text"], textarea').each(function(i, el) {
		$(el).prop('disabled', function(i, v) { return !v; });
	});

	if ($("#button-edit").text() == 'Edit this issue') {
		$("#button-edit").text('Save changes');
	}
	else {
		$("#button-edit").text('Edit this issue');
	}
});