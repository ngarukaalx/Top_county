// wait for the DOM to load
$(document).ready(function () {
	// aoutocomplet logic
	$('#searchInput').autocomplete({
		source: function (request, response) {
			const serchUrl = `http://127.0.0.1:5001/api/v1/search?query=${encodeURIComponent(request.term)}`;
			console.log(serchUrl);
			$.ajax({
				url: serchUrl,
				method: 'GET',
				success: function(data) {
					const sugestion = data.map(item => ({
						label: `County Name: ${item.name}, County Number: ${item.county_number}`,
						value: item.name,
						id: item.id
					}));
					response(sugestion);
				},
				error: function(xhr, status, error) {
					console.error("Autocomplete request failed: ", status, error);
				}
			});
		},
		minLength: 2,
		select: function (event, ui) {
			// store the name in the input field
			$('#searchInput').val(ui.item.value);
			$('#selectedId').val(ui.item.id);
			// prevent default behavior of setting the ibput value
			return false 
		}
	});

	// handles form submission
	$('#searchForm').on('submit', function (event) {
		event.preventDefault();
		const query = $('#selectedId').val();
		if (query) {
			window.open(`http://127.0.0.1:5000/county?value=${encodeURIComponent(query)}`, '_self');
		} else {
			alert('Oops not found!Check your entry...');
		}
	});
});
