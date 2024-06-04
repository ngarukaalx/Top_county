$(document).ready(async function() {
	// fetch userId asynchronously
	async function fetchUserId() {
		try {
				const response = await $.ajax({
						url: 'http://127.0.0.1:5001/api/v1/user_id',
						method: 'GET',
						headers: {
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

// update post btn based on userid
let id;
try {
	id = await fetchUserId();
} catch(error) {
	console.error('Error fetching id: ', error);
}
setTimeout(() => {
        const postButton = document.getElementById('post-content');
        if (id) {
            postButton.style.display = 'block';
        } else {
            postButton.style.display = 'none';
        }
    }, 1000);
});
