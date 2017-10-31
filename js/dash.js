$(document).ready(function() {
	var getOpenIssues = JSON.parse(localStorage.getItem('openIssues'));
	var openIssues = getOpenIssues == null ? [] : getOpenIssues;

	if (openIssues.length > 0) {
		$('#open-issues').append($('<h4>Tickets open in this session:</h4><br>'));
		for (i in openIssues) {
			var thisIssue = issues.filter(function( obj ) {
				return obj.id == openIssues[i];
			});
			$('#open-issues').append($('<div class="card bg-light mb-3 w-100"> \
  											<div class="card-header list-heading"> \
  												<a href="ticket.html?id=' + thisIssue[0].id + '" class="btn btn-primary btn-grow">#' + thisIssue[0].id + '&nbsp; <i class="fa fa-arrow-right"></i></a> \
  											</div> \
											<div class="card-body"> \
												<h4 class="card-title">' + thisIssue[0].details.problemType + '</h4> \
												<p class="card-text">' + thisIssue[0].details.problemSummary + '</p> \
											</div> \
										</div>'));
		}
	}
	else {
		$('#open-issues').append($('<h4>There are no tickets open in this session.</h4>'));
	}
});