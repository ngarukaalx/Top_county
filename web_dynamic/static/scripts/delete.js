// wait for DOM to load
$(document).ready(function() {
	let id = null;
	let formData = new FormData();

	$(document).on('click', '.glyphicon-trash', function() {
		id = $(this).data('Id');
		$('#confirmDeleteModal').modal('show');
	});
	$('#confirmDelete').click(function() {
		formData.append('fileId', id);

		// make delete reques
                $.ajax({
			url: 'http://127.0.0.1:5001/api/v1/delete',
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
				alert('Post deleted successfully!');
                                console.log(response);
				window.location.reload();
                        },
			error: function(xhr, status, error) {
                        console.error('Error creating post:', status, error);
                        alert('Failed to delete post.');
                        }
		});
	});
});
