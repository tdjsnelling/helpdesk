$(document).ready(function() {
	for (i in issues) {
		$('#all-issues').append($('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"> \
						<div class="d-flex flex-row"> \
							<div class="p-2 col"><b>' + issues[i].id + '</b></div> \
							<div class="p-2 col">' + moment(issues[i].createdAt).format('DD-MM-YYYY HH:mm') + '</div> \
							<div class="p-2 col">' + issues[i].status + '</div> \
							<div class="p-2 col">' + issues[i].details.problemType + '</div> \
							<div class="p-2 col no-overflow">' + issues[i].details.problemSummary + '</div> \
						</div> \
					</a>'));
	}
});

$(document).on('click', '.list-group-item-action', function() {
	var id = $($($(this).children()[0]).children()[0]).text();
	var getOpenIssues = JSON.parse(localStorage.getItem('openIssues'));
	var openIssues = getOpenIssues == null ? [] : getOpenIssues;

	if (openIssues.indexOf(id) == -1) {
		openIssues.push(id);
		localStorage.setItem('openIssues', JSON.stringify(openIssues));
	}

	location.href = 'issue.html?id=' + id;
});