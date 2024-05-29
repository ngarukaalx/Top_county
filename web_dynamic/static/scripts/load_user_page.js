// wait for the DOM to load
$(document).ready(function () {
	// check if a user is login
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
			let user_id = response.auth_user;
			// get this user
			$.ajax({
				url: `http://127.0.0.1:5001/api/v1/user/${user_id}`,
				method: "GET",
				headers: {
					'Content-Type': 'application/json'
				},
				success: async function (data) {
					// get profle for this user 
					// async fuction to fetch profile for this user
					async function fetchProfile(userId) {
						try {
							const response = await $.ajax({
								url: `http://127.0.0.1:5001/api/v1/profileuser/${ userId }`,
								method: "GET",
								headers: {
									'Content-Type': 'application/json'
								},
							});
							return response.length > 0 ? response[0] : null;
						} catch (error) {
							console.error('Error getting prifile:', error);
							throw error;
						}
					};
					// call fetchProfile with userId
					try {
						const profile = await fetchProfile(user_id);
						let urlLogo = "default";
						if (profile) {
							urlLogo = profile.url;
						}
						// clear profile section and append as per user
						$('.profile-header').empty();
						const logUrl = "http://127.0.0.1:5001/api/v1/uploads/" + urlLogo
						const img = $('<img>');
						img.addClass('profile-photo');
						img.addClass('img-responsive');
						img.attr({
							src: logUrl,
							alt: 'profile'
						});
						const h2 = $('<h2>').text(data.user_name);
						let title = data.role;
						if (data.role === null) {
							title = "Citizen";
						}
						const p = $('<p>').text(title);
						const userData = $('.profile-header');
						userData.append(img, h2, p);

						// upated settings with right data
						const userSet = $('#user_st');
						const emailSet = $('#email_st');

						const inputUser = $('<input>');
						inputUser.addClass('form-control');
						inputUser.attr({
							type: 'text',
							id: 'username',
							value: data.user_name
						});
						userSet.append(inputUser);
						const inputEmail = $('<input>');
						inputEmail.addClass('form-control');
						inputEmail.attr({
							type: 'text',
							id: 'email',
							value: data.email,
						});
						emailSet.append(inputEmail);
					} catch (error) {
						console.error("Failed to fetch profile:", error);
					}
					// fetch image posts for this user
					$.ajax({
						url: ``,
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						},
						success: async, function(datas) {
							// loop through datas and create post image
							$.each(datas, async, function (index, image) {
								const sectionImage = $('<section>');
								sectionImage.attr({
									id: "mypost"
								});
								sectionImage.addClass('col-lg-4');
								sectionImage.addClass('col-md-5');
								// to be appended to section
								const divImg = $('<div>);
								divImg.addClass('col-xs-3');
								// p1
								divImg.attr({ id: "img"});
								const imgp = $('<img>');
								imgp.attr({
									id: "pro,
									src: image.url,
									alt: "profile""
								});
								imgp.addClass('img-responsive');
								divImg.append(imgp);

								// p2
								const info = $('<div>');
								info.attr({ id: "details"});
								info.addClass('col-xs-5');
								const h6 = $('h6').text(data.user_name);
								const county = await fetchCounty(image.county_id);
								const pi = $('<p>').text("County: " + county);
								info.append(h6, county); // append to section
								// p3
								const divStatus = $('<div>');
								divStatus.attr({ id: "status" });
								divStatus.addClass('col-xs-2');
								const spn = $('span>');
								spn.addClass('glyphicon');
								spn.addClass('glyphicon-star');
								divStatus.append(spn); // append 2 section
								// append into section
								const edit = $('<div>');
								edit.addClass('col-xs-2');
								const editSpan = $('<span>');
								editSpan.addClass('glyphicon');
								editSpan.addClass('glyphicon-pencil');
								editSpan.addClass('edit');
								edit.append(editSpan); // appebd to section
								const fistDiv = $('<div>');
								fistDiv.addClass('row');
								firstDiv.attr({id: 'profile'});
								// section 1append
								firstDiv.append(divImg, info, divStatus, edit);
								const postContent = $('<div>');
								postContent.addClass('row');
								postContent.addClass('post-content');
								// child
								const cntend = $('<div>');
								cntend.addClass('col-xs-12');
								const postI = $('<p>').text(image.description);
								cntend.append(postI);
								// section append 2
								postContent.append(cntend);

								const postImage = $('<div>');
								postImage.addClass('row');
								postImage.addClass('post-image');
								const divImage = $('<div');
								divImage.addClass('col-xs-12');
								const Imagep = $('<img>');
								Imagep.attr({
									src: image.url,
									alt: post
								});
								imagep.addClass('img-responsive');
								divImage.append(Imagep);
								// section append 3
								postImage.append(divImage);

								// section 4 appends
								const postAction = $('<div>');
								postAction.addClass('row');
								postAction.addClass('post-actions');

								const ac1 = $('<div>');
								ac1.addClass('col-xs-4');
								const spanC1 = $('<span>').text('50');
								spanC1.addClass('add');
								spanC1.addClass('glyphicon');
								spanC1.addClass('glyphicon-heart');
								ac1.append(spanC1);

								const ac2 = $('<div>');
								ac2.addClass('col-xs-6');
								const spanC2 = $('<span>');
								spanC2.addClass('add');
								spanC2.addClass('glyphicon');
								spanC2.addClass('glyphicon-comment');

								const ac3 = $('<div>');
								ac3.addClass('col-xs-2');
								const spanC3 = $('<span>');
								spanC3.addClass('glyphicon');
								spanC3.addClass('glyphicon-remove');
								spanC3.addClass('edit-icon');

								postAction.append(ac1, ac2, ac3);


								// fill the section in full
								sectionImage.append(firstDiv, postContent, postImage, postAction);


							});
						}
					});
					// fetch video posts for this user
					$.ajax({
						url: ``,
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						},
						success: async, function(datas) {
						}
					});
				}
			});
		}
	});
});
