let openIssues;

var issues = [
	{
		id: "1234",
		createdAt: 1508502140338,
		status: "ongoing",
		people: {
			createdBy: "Tom Snelling",
			callerName: "John Smith",
			callerEmail: "john.smith@internalemail.com",
			specialist: null
		},
		details: {
			isNewProblem: true,
			followupOf: null,
			problemClassification: "hardware",
			problemType: "Printer issue",
			serialNumber: "123890XYZ",
			operatingSystem: null,
			softwareName: null,
			softwareVersion: null, 
			softwareLicense: null,
			problemSummary: "Documents not printing.",
			problemDetail: "Documents are successfully being sent to the printer, but nothing is ever printed.",
			tags: "printer, hardware, jammed"
		},
		solution: {
			isSolved: false,
			solvedAt: null,
			solvedBy: null,
			solutionDetail: null
		}
	},
	{
		id: "1235",
		createdAt: 1508502140786,
		status: "pending",
		people: {
			createdBy: "Dan Page",
			callerName: "James Simmons",
			callerEmail: "james.simmons@internalemail.com",
			specialist: null
		},
		details: {
			isNewProblem: true,
			followupOf: null,
			problemClassification: "software",
			problemType: "Software crash",
			serialNumber: null,
			operatingSystem: "Windows 10",
			softwareName: "Microsoft Access 2016",
			softwareVersion: "16.0.4229.1024", 
			softwareLicense: "GH267-4675H-47X07-09XNJ",
			problemSummary: "MS Access crashing on open.",
			problemDetail: "Whenever the user opens Microsoft Access, the loading window is shown but the program crashes to desktop immediately after.",
			tags: "software, crash, ms access, access 2016"
		},
		solution: {
			isSolved: false,
			solvedAt: null,
			solvedBy: null,
			solutionDetail: null
		}
	}
]

$(document).ready(function() {
	$('#user-select').val(localStorage.getItem('currentUser'));

	openIssues = JSON.parse(localStorage.getItem('openIssues'));
	for (i in openIssues) {
		$('ul.navbar-nav').append($('<li class="nav-item"><a class="nav-link issue-link" href="#" id="issue-link-' + openIssues[i] + '">#' + openIssues[i] + '</a><a class="nav-link close-issue" href="#"><i class="fa fa-times fa-small"></a></i></li>'))
	}

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});
});

$(document).on('change', '#user-select', function() {
	localStorage.setItem('currentUser', $('#user-select').val());
});

$(document).on('click', '.issue-link', function() {
	var id = $(this).attr('id').split('-')[2];
	location.href = 'ticket.html?id=' + id;
});

$(document).on('click', '.close-issue', function() {
	var id = $($(this).siblings()[0]).attr('id').split('-')[2];
	var index = openIssues.indexOf(id);
	openIssues.splice(index, 1);
	localStorage.setItem('openIssues', JSON.stringify(openIssues));
	
	if (location.href.indexOf('ticket.html') != -1) {
		location.href = 'all.html';
	}
	else {
		location.reload();
	}
});