$(document).on('click', '#login', function() {
	localStorage.setItem('username', $('#username').val());
	location.href = 'dash.html'
});