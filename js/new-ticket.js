$(document).on('change', 'input[name=classification]:radio', function() {
    switch($(this).val()) {
        case 'hw-issue':
            $('#serial-number').parent().show();
			$('#operatingsystem').parent().hide();
			$('#software-name').parent().hide();
			$('#software-version').parent().hide();
            break;
        case 'sw-issue':
            $('#serial-number').parent().hide();
			$('#operatingsystem').parent().show();
			$('#software-name').parent().show();
			$('#software-version').parent().show();
            break;
    }
});