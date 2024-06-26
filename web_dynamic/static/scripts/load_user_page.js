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
		success: async function (response) {
			let user_id = response.auth_user;
			// get this user asynchronously
			async function getUser(userid) {
				try {
					const userObj = $.ajax({
						url: `http://127.0.0.1:5001/api/v1/user/${user_id}`,
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						},
					});
					return userObj;
				} catch (error) {
					console.error('Error getting user:', error);
					throw error;
				}
			};
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
					// fetch county name using county_id from user
					async function fetchCounty(id) {
						try {
							const fedback = await $.ajax({
								url: `http://127.0.0.1:5001/api/v1/counties/${ id }`,
								method: "GET",
								headers: {
									'Content-Type': 'application/json'
								},
							});
							return fedback.name;
						} catch (error) {
							console.error('Error fetching county:', error);
							throw error
						}
					};
			                // get user to make it available throught
			                let thisUser = await getUser(user_id);
					// call fetchProfile with userId
					try {
						const profile = await fetchProfile(user_id);
						let urlLogo = "logo.jpg";
						if (profile) {
							urlLogo = profile.url;
						}
						// clear profile section and append as per user
						$('.profile-header').empty();
						$('.profile-photo-wrapper').empty();
						const spnE = $('<span>').addClass('glyphicon glyphicon-pencil profile-edit').attr({
							'data-toggle': 'modal',
							'data-target': '#imageUploadModal'
						});
						const logUrl = "http://127.0.0.1:5001/api/v1/uploads/" + urlLogo

						const img = $('<img>');
						img.addClass('profile-photo');
						img.addClass('img-responsive');
						img.attr({
							src: logUrl,
							alt: 'profile'
						});
						$('.profile-photo-wrapper').append(img, spnE);

						const h2 = $('<h2>').text(thisUser.user_name);
						let title = thisUser.role;
						if (thisUser.role === null) {
				          		title = "Citizen";
						}
						const p = $('<p>').text(title);
						const userData = $('.profile-header');
						const postBtn = $('<button>').addClass('btn btn-primary btn-xs').text("+post").attr({
							id: 'post-content',
							type: 'button',
							'data-toggle': 'modal',
							'data-target': '#postModal'
						}).css('display', 'none');
						userData.append(h2, p, postBtn);

						// upated settings with right data
						const userSet = $('#user_st');
						const emailSet = $('#email_st');

						const inputUser = $('<input>');
						inputUser.addClass('form-control');
						inputUser.attr({
							type: 'text',
							id: 'username',
							value: thisUser.user_name
						});
						userSet.append(inputUser);
						const inputEmail = $('<input>');
						inputEmail.addClass('form-control');
						inputEmail.attr({
							type: 'text',
							id: 'email',
							value: thisUser.email,
						});
						emailSet.append(inputEmail);
					} catch (error) {
						console.error("Failed to fetch profile:", error);
					}
					// fetch image posts for this user
			                
					$.ajax({
						url: `http://127.0.0.1:5001/api/v1/imageuser/${ user_id }`,
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						},
						success: async function(datas) {
							// loop through datas and create post image
							$.each(datas, async function (index, image) {
								const sectionImage = $('<section>');
								sectionImage.attr({
									id: "mypost"
								});
								sectionImage.addClass('col-lg-4');
								sectionImage.addClass('col-md-5');
								// to be appended to section
								const divImg = $('<div>');
								divImg.addClass('col-xs-3');
								// p1
								divImg.attr({ id: "img"});
								const imgp = $('<img>');
								const urlImage = "http://127.0.0.1:5001/api/v1/uploads/" + image.url
								// fetch profile for this user
								const profileUser = await fetchProfile(thisUser.user_id);
								let defaulProfile = "http://127.0.0.1:5001/api/v1/uploads/logo.jpg";
								if (profileUser) {
									defaulProfile = "http://127.0.0.1:5001/api/v1/uploads/" + profileUser.url
								}
								imgp.attr({
									id: "pro",
									src: defaulProfile,
									alt: "profile"
								});
								imgp.addClass('img-responsive');
								divImg.append(imgp);

								// p2
								const info = $('<div>');
								info.attr({ id: "details"});
								info.addClass('col-xs-5');
								const h6 = $('<h6>').text(thisUser.user_name);
								let county;
								try {
									county = await fetchCounty(thisUser.county_id);
								} catch (error) {
									console.error('Error getting name:', error);
								}

								const pi = $('<p>').text("County: " + county);
								info.append(h6, pi); // append to section
								// p3
								const divStatus = $('<div>');
								divStatus.attr({ id: "status" });
								divStatus.addClass('col-xs-2');
								const spn = $('<span>');
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
								fistDiv.attr({id: 'profile'});
								// section 1append
								fistDiv.append(divImg, info, divStatus, edit);
								const postContent = $('<div>');
								postContent.addClass('row');
								postContent.addClass('post-content');
								// child
								const cntend = $('<div>');
								cntend.addClass('col-xs-12');
								// display only the first 100 chars
								const postI = $('<p>').text(image.description.slice(0, 100)).addClass('post-text').attr({id: 'remove-t'});
								const a1 = $('<a>').addClass('more-link').text('...more').attr({href: 'javascript:void(0);'});
								const moreText = $('<span>').addClass('more-text').text(image.description.slice(100)).hide(); // hide the rest description
								// append the hidden to postI
								postI.append(moreText);
								cntend.append(postI, a1);
								// section append 2
								postContent.append(cntend);

								const postImage = $('<div>');
								postImage.addClass('row');
								postImage.addClass('post-image');
								const divImage = $('<div>');
								divImage.addClass('col-xs-12').addClass('post-image');
								const imagep = $('<img>');
								imagep.attr({
									src: "http://127.0.0.1:5001/api/v1/uploads/" + image.url,
									alt: "image"
								});
								imagep.addClass('img-responsive');
								divImage.append(imagep);
								// section append 3
								postImage.append(divImage);

								// section 4 appends
								const postAction = $('<div>');
								postAction.addClass('row');
								postAction.addClass('post-actions');

								const ac1 = $('<div>');
								ac1.addClass('col-xs-4');
								const spanC1 = $('<span>').text('50');
								spanC1.addClass('glyphicon glyphicon-heart add');
								ac1.append(spanC1);

								const ac2 = $('<div>');
								ac2.addClass('col-xs-6');
								const spanC2 = $('<span>').text('100');
								spanC2.addClass('glyphicon glyphicon-comment add');
								ac2.append(spanC2);

								const ac3 = $('<div>');
								ac3.addClass('col-xs-2');
								const spanC3 = $('<span>').addClass('glyphicon glyphicon-trash delete').data('Id', image.id);
								ac3.append(spanC3);

								postAction.append(ac1, ac2, ac3);


								// fill the section in full
								sectionImage.append(fistDiv, postContent, postImage, postAction);
								const rowImage = $('#postImages');
								rowImage.append(sectionImage);


							});
						}
					});
					// fetch video posts for this user
					$.ajax({
						url: `http://127.0.0.1:5001/api/v1/videouser/${ user_id }`,
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						},
						success: async function(datas) {
							// loop through each datas and create a video post
							$.each(datas, async function(index, video) {
								// fisrt div
								const firstDiv = $('<div>').addClass('row');
								firstDiv.attr({
									id: 'profile'
								});
								const vidDiv = $('<div>').addClass('col-xs-3');
								vidDiv.attr({
									id: "img"
								});
								const vidImg = $('<img>');
								vidImg.addClass('profile-img');
								vidImg.addClass('img-responsive');
								let profileDefault = "http://127.0.0.1:5001/api/v1/uploads/logo.jpg";
								const profileUser = await fetchProfile(thisUser.user_id);
								if (profileUser) {
									profileDefault = "http://127.0.0.1:5001/api/v1/uploads/" + profileUser.url
								}
								vidImg.attr({
									id: 'pro',
									src: profileDefault,
									alt: "profile"
								});
								// first div append1
								vidDiv.append(vidImg);

								const vidDetails = $('<div>').addClass('col-xs-5');
								vidDetails.attr({
									id: "details"
								});
								const h6 = $('<h6>').text(thisUser.user_name);
								let countyn;
								try {
									countyn = await fetchCounty(thisUser.county_id);
								} catch (error) {
									console.error('Error getting countyname:', error);
								}
								const pv = $('<p>').text(countyn);
								// first div append2
								vidDetails.append(h6, pv);

								const divStat = $('<div>').addClass('col-xs-2');
								divStat.attr({ id: "status"});
								const spanStar = $('<span>').addClass('glyphicon');
								spanStar.addClass('glyphicon-star');

								// first div append3
								divStat.append(spanStar);

								const divEd = $('<div>').addClass('col-xs-2');
								const spanEdit = $('<span>').addClass('glyphicon');
								spanEdit.addClass('glyphicon-pencil');
								spanEdit.addClass('edit');
								// first div append4
								divEd.append(spanEdit);

								// now append to first div
								firstDiv.append(vidDiv, vidDetails, divStat, divEd ); // section append 1

								// second div
								const vidContent = $('<div>').addClass('row');
								vidContent.addClass('post-content');
								const vidtext = $('<div>').addClass('col-xs-12');
								const vidp = $('<p>').text(video.description.slice(0, 100)).addClass('post-text');
								const a1 = $('<a>').addClass('more-link').text('...more').attr({href: 'javascript:void(0);'});
								const moreText = $('<span>').addClass('more-text').text(video.description.slice(100)).hide(); // hide the rest description
								vidp.append(moreText);
								vidtext.append(vidp, a1);


								vidContent.append(vidtext); // section append2
								//third div
								const vida = $('<div>').addClass('row post-video');
								const vidS = $('<div>').addClass('col-xs-12');
								const videoP = $('<video>').addClass('img-responsive video-post');
								videoP.attr('controls', true);
								const source = $('<source>').attr({
									src: "http://127.0.0.1:5001/api/v1/uploads/" + video.url,
									type: 'video/mp4'
								});
								videoP.append(source);
								vidS.append(videoP);
								vida.append(vidS); // section append 3
								
								// forth div
								const actions = $('<div>').addClass('row post-actions');
								const dispn1 = $('<div>').addClass('col-xs-4');
								const dispn2 = $('<div>').addClass('col-xs-6');
								const dispn3 = $('<div>').addClass('col-xs-2');
								const spn1 = $('<span>').addClass('add glyphicon glyphicon-heart');
								dispn1.append(spn1);
								const spn2 = $('<span>').addClass('add glyphicon glyphicon-comment');
								dispn2.append(spn2);
								const spn3 = $('<span>').addClass('glyphicon glyphicon-trash delete').data('Id', video.id);
								dispn3.append(spn3);
								actions.append(dispn1, dispn2, dispn3); // section append 4
								const sectionVideo = $('<section>').addClass('col-lg-4 col-md-5');
								sectionVideo.attr({
									id: "mypost"
								});

								// app all divs to sectionVideo
								sectionVideo.append(firstDiv, vidContent, vida, actions);
								const videoPostf = $('#videoPost');
								videoPostf.append(sectionVideo);

							});
						}
					});
				}
			});
});
