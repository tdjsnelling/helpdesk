function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {
	setTimeout(function() {
		var id = '#issue-link-' + getParameterByName('id');
		$(id).addClass('active');
	}, 50);
});

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