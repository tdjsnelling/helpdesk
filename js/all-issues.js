var sorting = 'idDesc';

var sortBy = function(field, reverse, primer) {
	var key = primer ? 
		function(x) {return primer(x[field])} : 
		function(x) {return x[field]};

	reverse = !reverse ? 1 : -1;

	return function (a, b) {
		return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	} 
}

function populate(issuesList, sorting) {
	$('.list-group-item-action').remove();

	if (sorting == 'idDesc') {
		issuesList.sort(sortBy('id', true, parseInt));
	}
	else if (sorting == 'idAsc') {
		issuesList.sort(sortBy('id', false, parseInt));
	}
	else if (sorting == 'statusDesc') {
		issuesList.sort(sortBy('id', true, null));
	}
	else if (sorting == 'statusAsc') {
		issuesList.sort(sortBy('id', false, null));
	}

	for (i in issuesList) {
		$('#all-issues').append($('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"> \
						<div class="d-flex flex-row"> \
							<div class="p-2 col"><b>' + issues[i].id + '</b></div> \
							<div class="p-2 col">' + moment(issues[i].createdAt).format('DD-MM-YYYY HH:mm') + '</div> \
							<div class="p-2 col"><span id="status-' + issues[i].id + '">' + issues[i].status + '</span></div> \
							<div class="p-2 col no-overflow">' + issues[i].details.problemType + '</div> \
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
	populate(issues, sorting);
});

$(document).on('click', '.list-group-item-action', function() {
	var id = $($($(this).children()[0]).children()[0]).text();
	var getOpenIssues = JSON.parse(localStorage.getItem('openIssues'));
	var openIssues = getOpenIssues == null ? [] : getOpenIssues;

	if (openIssues.indexOf(id) == -1) {
		openIssues.push(id);
		localStorage.setItem('openIssues', JSON.stringify(openIssues));
	}

	location.href = 'ticket.html?id=' + id;
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
		"status",
		"details.problemType",
		"details.problemSummary"
	]
};
var fuse = new Fuse(issues, searchOptions);

$(document).on('input', '#searchInput', function() {
	if ($(this).val() != "") {
		var result = fuse.search($(this).val());
		populate(result, sorting);
	}
	else {
		populate(issues, sorting);
	}
});

$(document).on('click', '#sort-id', function() {
	$('#sort-status').removeClass().addClass('fa fa-sort sort-button');
	if (sorting == 'idDesc') {
		sorting = 'idAsc';
		$(this).removeClass().addClass('fa fa-caret-up sort-button');
	}
	else {
		sorting = 'idDesc';
		$(this).removeClass().addClass('fa fa-caret-down sort-button');
	}
	populate(issues, sorting);
});
$(document).on('click', '#sort-status', function() {
	$('#sort-id').removeClass().addClass('fa fa-sort sort-button');
	if (sorting == 'statusDesc') {
		sorting = 'statusAsc';
		$(this).removeClass().addClass('fa fa-caret-up sort-button');
	}
	else {
		sorting = 'statusDesc';
		$(this).removeClass().addClass('fa fa-caret-down sort-button');
	}
	populate(issues, sorting);
});