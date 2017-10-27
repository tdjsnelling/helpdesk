function populate(issuesList) {
	$('.list-group-item-action').remove();
	for (i in issuesList) {
		$('#all-issues').append($('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"> \
						<div class="d-flex flex-row"> \
							<div class="p-2 col"><b>' + issues[i].id + '</b></div> \
							<div class="p-2 col">' + moment(issues[i].createdAt).format('DD-MM-YYYY HH:mm') + '</div> \
							<div class="p-2 col"><span id="status-' + issues[i].id + '">' + issues[i].status + '</span></div> \
							<div class="p-2 col">' + issues[i].details.problemType + '</div> \
							<div class="p-2 col no-overflow">' + issues[i].details.problemSummary + '</div> \
						</div> \
					</a>'));

		if (issues[i].status == 'ongoing') {
			$('#status-' + issues[i].id).addClass('green');
		}
		else if (issues[i].status == 'pending') {
			$('#status-' + issues[i].id).addClass('orange');
		}
	}
}

$(document).ready(function() {
	populate(issues);
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

var searchOptions = {
	shouldSort: true,
	threshold: 0.2,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [
		"id",
		"details.problemType",
		"details.problemSummary"
	]
};
var fuse = new Fuse(issues, searchOptions);

$(document).on('input', '#searchInput', function() {
	if ($(this).val() != "") {
		var result = fuse.search($(this).val());
		console.log(result)
		populate(result);
	}
	else {
		populate(issues);
	}
});