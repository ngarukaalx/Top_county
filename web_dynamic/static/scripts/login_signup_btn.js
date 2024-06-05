// wait for DOM to load
$(document).ready(function () {
	// get the current login user
	$.ajax({
		url: "http://127.0.0.1:5001/api/v1/user_id",
		method: "GET",
		hearders: {
			'Content-Type': 'application/json'
		},
		xhrFields: {
			withCredentials: true
		},
		success: function (response) {
			const userId = response.auth_user;
			if (userId) {
				const ul = $('#login-nav');
				ul.empty();
				ul.append("<li id='sign-link'><a href='#'><span class='glyphicon glyphicon-user'></span> myprofile</a></li>");
				ul.append("<li id='login-link'><a href='#'><span class='glyphicon glyphicon-log-in'></span> logout</a></li>");
			}
		},
		error: function (xhr, status, error) {
			const ul = $('#login-nav');
			ul.empty();
			ul.append("<li id='sign-link'><a href='#'><span class='glyphicon glyphicon-user'></span> sign up</a></li>");
			ul.append("<li id='login-link'><a href='#'><span class='glyphicon glyphicon-log-in'></span> login</a></li>");
		}
	});
});
