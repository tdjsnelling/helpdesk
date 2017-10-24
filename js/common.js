let openIssues;

$(document).ready(function() {
	$('#user-select').val(localStorage.getItem('currentUser'));

	openIssues = JSON.parse(localStorage.getItem('openIssues'));
	for (i in openIssues) {
		$('ul.navbar-nav').append($('<li class="nav-item"><a class="nav-link issue-link" href="#" id="issue-link-' + openIssues[i] + '">#' + openIssues[i] + '</a><a class="nav-link close-issue" href="#"><i class="fa fa-times"></a></i></li>'))
	}
});

$(document).on('change', '#user-select', function() {
	localStorage.setItem('currentUser', $('#user-select').val());
});

$(document).on('click', '.issue-link', function() {
	var id = $(this).attr('id').split('-')[2];
	location.href = 'issue.html?id=' + id;
});

$(document).on('click', '.close-issue', function() {
	var id = $($(this).siblings()[0]).attr('id').split('-')[2];
	var index = openIssues.indexOf(id);
	openIssues.splice(index, 1);
	localStorage.setItem('openIssues', JSON.stringify(openIssues));
	location.href = 'index.html';
});