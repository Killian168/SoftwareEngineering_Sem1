$(document).ready(
    function() {        
        /**
         * Event handler for when the user attempts to register
         */
        $("#reg-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/register',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
                    $(location).attr('href', '/about' );
		        // Redirect to a login page
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        }); 
    
        /**
         * Event handler for when the user attempts to log in
         */
        $("#log-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
                     $(location).attr('href', '/about' );
		  // Redirect to logged in page
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        });
    }
);