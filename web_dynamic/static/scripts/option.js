// wait for the DOM to load
$(document).ready(function () {
    // use ajax to fetch couties
    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/counties",
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
            // get the select option to edit
            const county = $("#county");
            $.each(data, function(index, cty) {
                county.append("<option value='" + cty.id + "'>" + cty.name + "</option>")
            });
        }
    });

    // use ajax to  fetch sucounties
    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/sub",
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
            // get the select option to edit
            const subCounty = $("#sub-county");
            $.each(data, function(index, cty) {
                subCounty.append("<option value='" + cty.id + "'>" + cty.name + "</option>")
            });
        }
    });

    // use ajax to fetch ward
    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/ward",
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
            // get the select option to edit
            const ward = $("#ward");
            $.each(data, function(index, cty) {
                ward.append("<option value='" + cty.id + "'>" + cty.name + "</option>")
            });
        }
    });


	// fill the option on subcounty and based on value of county
	let countyId;
	let subId;
	$('#county').change(function() {
		$('.next-button').prop('disabled', true);
		countyId = $(this).val()
		// update option for ward based on county id
		// get the subcounty based on id(value)
		$.ajax({
			url: `http://127.0.0.1:5001/api/v1/subc/${ countyId }`,
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				const sub = $("#sub-county");
				// remove all previouse values
				sub.empty();
				$.each(data, function(index, wrd) {
					sub.append("<option value='" + wrd.id + "'>" + wrd.name + "</option>")
				});
			}
		});
		// check for change in option subcouty and update ward bazed on subcounty id
		$('#sub-county').change(function() {
			$('.next-button').prop('disabled', true);
			subId = $(this).val()
			// fetch the wards of this subcounty
			$.ajax({
				url: `http://127.0.0.1:5001/api/v1/wards/${ subId }`,
				methods: "GET",
				headers: {
					'Content-Type': 'application/json'
				},
				success: function(data) {
					const ward = $('#ward');
					// remove all previouse values
					ward.empty();
					$.each(data, function(index, cty) {
						ward.append("<option value='" + cty.id + "'>" + cty.name + "</option>")
					});
				},
				error: function(xhr, status, error) {
					console.error("Error fetching wards:", status, error);
				}
			});
		});
		$('#ward').change(function() {
			const wardId = $(this).val();
			if (wardId && countyId && subId) {
				// enable btn next
				$('.next-button').prop('disabled', false);
			} else {
				// disable btn next
				$('.next-button').prop('disabled', true);
			}
		});
	});
	// fetch data when next is clicked
	$('.next-button').on('click', () => {
		
		const county_id = $('#county').val();
	        const subcounty_id = $('#sub-county').val();
		const ward_id = $('#ward').val();

		// listen on submit signup btn
		$('#sign-form').submit(function(event) {
			event.preventDefault();
			const signData = {
				user_name: $('#username').val(),
				email: $('#email').val(),
				password: $('#password1').val()
			};
			const password2 = $('#password2').val();

			// error if pasword dont match
			if (signData.password !== password2) {
				alert("passoword dont match");
			} else {
				// procced user creation
				$.ajax({
					url: `http://127.0.0.1:5001/api/v1/user/${ county_id }/${ subcounty_id }/${ ward_id }`,
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					data: JSON.stringify(signData),
					success: function(response) {},
					error: function(xhr, status, error) {
						console.error('Error creating user:', status, error);
					}
				});
			}

		});
	});

	// handles login
	$('#log').submit(function(event) {
		event.preventDefault();
		const logForm = {
			email: $('#emaill').val(),
			password: $('#password').val(),
		};

		$.ajax({
			// login
			url: "http://127.0.0.1:5001/api/v1/login",
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			xhrFields: {
				withCredentials: true
			},
			data: JSON.stringify(logForm),
			success: function(response) {
				// redirects the user to user page
				window.location.href = "http://127.0.0.1:5000/user";
			},
			error: function(xhr, status, error) {
				console.error('Error  login:', status, error);
			}
		});
	});
});
