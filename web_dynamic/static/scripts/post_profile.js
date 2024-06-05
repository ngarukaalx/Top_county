// wait DOM
$(document).ready(function() {
	$('#profile-post').on('click', function() {
		var fileInput = document.getElementById('imageInput');
		if (fileInput.files.length > 0) {
                       // get user id
                       $.ajax({
                       url: "http://127.0.0.1:5001/api/v1/user_id",
                       method: "GET",
                       headers: {
                                'Content-Type': 'application/json'
                       },
                       xhrFields: {
                                withCredentials: true
                       },
                       success: function (response) {
                               user_id = response.auth_user;
			       if (user_id) {
				       const profile =  $('#imageInput')[0].files[0];
				       let formData = new FormData();
				       formData.append('profile', profile);
				       formData.append('user_id', user_id);

				       // send post request
                                       $.ajax({
					       url: 'http://127.0.0.1:5001/api/v1/uploads',
                                               method: 'POST',
                                               data: formData,
                                               processData: false,
                                               contentType: false,
                                               success: function(response) {
						       alert('Post created successfully!');
                                                       window.location.reload();
                                               },
                                               error: function(xhr, status, error) {
						       console.error('Error creating post:', status, error);
                                                       alert('Failed to create post.');
					       }
				       });

			       }

                       },
                       error: function(xhr, status, error) {
                                console.error("Error getting userId", status, error);
                       }
                       });
		}
	});
});
