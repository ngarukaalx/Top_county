// wait for the DOM to load
$(document).ready(function () {
	$(document).on('click', '#login-link', function (event) {
		event.preventDefault();
		if ($(this).text().trim() === 'login') {
			window.location.href = "http://127.0.0.1:5000/register";
		} else {
			// logout the user
			$.ajax({
				url: "http://127.0.0.1:5001/api/v1/logout",
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				xhrFields: {
					withCredentials: true
				},
				success: function (response) {
					alert('Logout succefully.');
					window.location.href = "http://127.0.0.1:5000/home";

				},
				error: function(xhr, status, error) {
					console.error("Failed to logout the current user", status, error);
				}
			});
		}
	});
	$(document).on('click', '#sign-link', function (event) {
		event.preventDefault();
		console.log("signclicked");
		if ($(this).text().trim() === 'sign up') {
			window.location.href = "http://127.0.0.1:5000/register";
		} else {
			 window.location.href = "http://127.0.0.1:5000/user";
		}
	});
});
