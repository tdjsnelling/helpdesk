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
	}, 20);

	let loadedIssue;
	for (i in issues) {
		if (issues[i].id == getParameterByName('id')) {
			loadedIssue = issues[i];
		}
	}

	$('#problemId').text(loadedIssue.id);
	$("#status").text(loadedIssue.status);
	$('#createdAt').text(moment(loadedIssue.createdAt).format('DD-MM-YYYY HH:mm'));
	$('#createdBy').text(loadedIssue.people.createdBy);

	var tags = loadedIssue.details.tags.split(', ');
	for (i in tags) {
		$('.tags').append($('<span class="badge badge-secondary">' + tags[i] + '</span>'));
	}

	$('#callerName').val(loadedIssue.people.callerName);
	$("#callerEmail").val(loadedIssue.people.callerEmail);

	$('#problemClassification').val(loadedIssue.details.problemClassification);
	$('#serialNumber').val(loadedIssue.details.serialNumber);
	$('#operatingSystem').val(loadedIssue.details.operatingSystem);
	$('#softwareName').val(loadedIssue.details.softwareName);
	$('#softwareVersion').val(loadedIssue.details.softwareVersion);
	$('#softwareLicense').val(loadedIssue.details.softwareLicense);
	$('#problemSummary').val(loadedIssue.details.problemSummary);
	$('#problemDetail').val(loadedIssue.details.problemDetail);

	if (loadedIssue.status == 'ongoing') {
		$('#status').addClass('green');
	}
	else if (loadedIssue.status == 'pending') {
		$('#status').addClass('orange');
	}

});

$(document).on('click', '#button-edit', function() {
	$('input[type="text"], textarea').each(function(i, el) {
		$(el).prop('disabled', function(i, v) { return !v; });
	});

	if ($("#button-edit").text() == 'Edit this ticket') {
		$("#button-edit").text('Save changes');
	}
	else {
		$("#button-edit").text('Edit this ticket');
	}
});