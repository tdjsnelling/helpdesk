$(document).ready(function() {
	$('#user-select').val(localStorage.getItem('currentUser'));
});

$(document).on('change', '#user-select', function() {
	localStorage.setItem('currentUser', $('#user-select').val());
});