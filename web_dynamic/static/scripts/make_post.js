// wait for DOM TO LOAD
$(document).ready(function () {
    // handles the ajax post request
    $('#submitPost').on('click', async function() {
	    console.log("clicked");

        // fetch userId asynchronously
        async function fetchUserId() {
		try {
			const response = await $.ajax({
				url: 'http://127.0.0.1:5001/api/v1/user_id',
				method: 'GET',
				hearders: {
					'Content-Type': 'application/json'
				},
				xhrFields: {
					withCredentials: true
				},
			});
			return response.auth_user
		} catch (error) {
			console.error('Error fetching id:', error);
			throw error;
		}
	};

        // create a form to be appended later
        let formData = new FormData();

        let form = $('#post-form')[0];
        const description = $('#description').val();

        // fetch file input and file
        let imagefile;
        if ($('#post-image').length > 0) {
            imagefile = $('#image-input')[0].files[0];
        }

        // fetch video input
        let videofile;
        if ($('#post-video').length > 0) {
                videofile = $('#video-input')[0].files[0];
        }

        // checks if its a text post
        if (description && $('#post-video').length === 0 && $('#post-image').length === 0) {
            formData.append("description", description);
        }

        // check if its an image post
        if (imagefile) {
            formData.append('image', imagefile);
            if (description) {
                formData.append('description', description);
            }
        }

        // check if its a video post
        if (videofile) {
            formData.append('video', videofile);
            if (description) {
                formData.append("description", description);
            }
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // append userid to formDat
	let user_id;
	    try {
		    user_id = await fetchUserId();
	    } catch (error) {
		    console.error("Error checking iduser: ", error);
	    }
        formData.append('user_id', user_id);

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
    });
});
