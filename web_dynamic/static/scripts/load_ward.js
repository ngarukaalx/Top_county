// wait for the DOM to load
$(document).ready(async function () {

	// fetch value from url
	const urlParams = new URLSearchParams(window.location.search);
	const wardId = urlParams.get('value');
        
	
	// fetch ward asynchronously
	async function fetchWard(id) {
		try {
			const response = await $.ajax({
				url: `http://127.0.0.1:5001/api/v1/ward/${id}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			return response;
		} catch (error) {
			console.error('Error getting ward:', error);
			throw error;
		}
	}

	// call fetchWard with id from clicked
	let wardObj;
	try {
		wardObj = await fetchWard(wardId);
	} catch (error) {
		console.error('Error getting ward: ', error);
	}

    // get a subcounty given an id
    async function fetchSubounty(id) {
        try {
                const response = await $.ajax({
                        url: `http://127.0.0.1:5001/api/v1/sub/${id}`,
                        method: 'GET',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                });
                return response;
        } catch (error) {
                console.error('Error getting subcounty:', error);
                throw error;
        }
    }

    // fetchSubounty given an id
    let subCoutyobj;
    try {
		subCoutyobj = await fetchSubounty(wardObj.subcounty_id);
	} catch (error) {
		console.error('Error getting subcounty: ', error);
	}
	// fetch a user given a userid
	async function userByid(id) {
		try {
			const users = await $.ajax({
				url: `http://127.0.0.1:5001/api/v1/user/${ id }`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			return users;
		} catch (error) {
			console.error('Error getting users: ', error);
			throw error;
		} 
	}

	// fetch profile for a specific user id
	async function getProfile(id) {
		try {
			const profile = await $.ajax({
				url: `http://127.0.0.1:5001/api/v1/profileuser/${ id }`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			return profile.url;
		} catch (error) {
			console.error('Error getting profile: ', error);
			throw error;
		}
	}

	// get number of users per subcounty
	async function getNumberUsers(id) {
		try {
			const count = await $.ajax({
				url: `http://127.0.0.1:5001/api/v1/usercount/ward/${ id }`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			return count;
		} catch (error) {
			console.error('Error getting count: ', error);
			throw error;
		}
	}


	// fetch image posts
	async function getImages() {
		try {
			const imagePost = await $.ajax({
				url: `http://127.0.0.1:5001/api/v1/image`,
				method: "GET",
				headers: {
					'Content-Type': 'application/json'
				},
			});
			return imagePost;
		} catch (error) {
			console.error('Error getting images; ', error);
			throw error;
		}
	}


	// fetch video post
	async function getVideoPost() {
		try {
			const videos = await $.ajax({
				url: 'http://127.0.0.1:5001/api/v1/video',
				method: 'GET',
				headers: {
					 'Content-Type': 'application/json'
				},
			});
			return videos;

		} catch (error) {
			console.error('Error getting videos: ', error);
			throw error;
		}
	}
	// update ward name and searchbar and leader
	const h4 = $('<h4>').text('Ward:' + wardObj.name);
	const h6 = $('<h6>').text('Subcounty: ' + subCoutyobj.name);
	
	const pc = $('<p>').text('Members');
	const spnText = await getNumberUsers(wardObj.id);
	const spnCount = $('<span>').addClass('badge').text(spnText);
	pc.append(spnCount);
        // button post
        const postBtn = $('<button>').addClass('btn btn-primary btn-xs').text("+post").attr({
                                                        id: 'post-content',
                                                        type: 'button',
                                                        'data-toggle': 'modal',
                                                        'data-target': '#postModal'
                                                }).css('display', 'none');
	const nameCounty = $('#name-county');
        nameCounty.empty();
	nameCounty.append(h4, h6, pc, postBtn);

	// leader section 
	const a = $('<a>').attr({href: "#"});
	const img = $('<img>').addClass('profile-img img-responsive').attr({
		src: 'http://127.0.0.1:5001/api/v1/uploads/logo.jpg',
		alt: "gvn"
	});
	a.append(img);
	const h4Leader = $('<h4>').text('Hon: pending');
	const btn = $('<button>').addClass('btn btn-info').text('More').attr('disable', true);
	const leader = $('#head');
	    leader.empty();
	leader.append(a, h4Leader, btn);


	/*
	// fetch wards for this subcounty
	try {
		const wrd = await wardSub(subId);
		$('#btn-drp').text('Wards');
		const carret = $('<span>').addClass('caret');
		$('#btn-drp').append(carret);
		$('.custom-dropdown-menu').empty();
		$('.custom-dropdown-menu').attr({id: 'drpw'});
		// loop through each subcounty
		$.each(wrd, function(index, ward) {
			const dropDown = $('.custom-dropdown-menu');
			const li = $('<li>').text(ward.name).attr('sub-id', ward.id);

			// append to dropdown
			dropDown.append(li);
		});
	} catch (error) {
		console.error('Error getting wards: ', error);
	}
	*/

	// hide dropdown its not needed here
	$('.custom-dropdown-menu').hide();


	// call getImages() to fetch all images update the page with only post for this county
	try {                                                                                      // reached here
		let allImages = await getImages();
		$('#dynamic').empty();

		// loop through each image
		$.each(allImages, async function(index, image) {
			// call userByid(id) fuction to get a user of this image
			const user = await userByid(image.user_id);
			// check if this user belongs to this county
			if (user.ward_id == wardId) {
				// populate the page with this post
				const firstDiv = $('<div>').addClass('row').attr({
					id: "profile"
				})

				const first1 = $('<div>').addClass('col-xs-3').attr({
					id: 'img'
				});

				const myProfile = await getProfile(user.id);
				// default url for profile
				let pUrl = 'http://127.0.0.1:5001/api/v1/uploads/logo.jpg' 
				if (myProfile) {
					pUrl = "http://127.0.0.1:5001/api/v1/uploads/" + myProfile.url;
				}

				const img = $('<img>').addClass('img-responsive').attr({
					id: "pro",
					src: pUrl,
					alt: 'myprofile'
				});

				// will be append to firstDiv
				first1.append(img);

				const first2 = $('<div>').addClass('col-xs-5').attr({
					id: 'details'
				});
				const h6 = $('<h6>').text(user.user_name);
				const p = $('<p>').text('ward: ' + wardObj.name);       // reach here
				// will be appended to firstDiv
				first2.append(h6, p);

				const first3 = $('<div>').addClass('col-xs-2').attr({
					id: "status"
				});

				const spn1 = $('<span>').addClass('glyphicon glyphicon-star');
				// will be appended to firstDiv
				first3.append(spn1);

				const first4 = $('<div>').addClass('col-xs-2');
				const spn2 = $('<span>').addClass('glyphicon glyphicon-remove rmv');

				first4.append(spn2);

				// append to fisrtDiv
				firstDiv.append(first1, first2, first3, first4); // first section append 1

				const secondDiv = $('<div>').addClass('row post-content').attr({id: 'remove-c'});

				const second1 = $('<div>').addClass('col-xs-12');
				const ptext = $('<p>').text(image.description).attr({id: 'remove-t'});

				const a1 = $('<a>').addClass('read-more').text('...more').attr({href: 'javascript:void(0);'});
				const a2 = $('<a>').addClass('hide-more').text('...hide').attr({href: 'javascript:void(0);'});

				second1.append(ptext, a1, a2);

				secondDiv.append(second1); // section append 2

				const thirdDiv = $('<div>').addClass('row post-image')

				const third1 = $('<div>').addClass('col-xs-12');

				const imgp = $('<img>').addClass('img-responsive').attr({
					src: "http://127.0.0.1:5001/api/v1/uploads/" + image.url,
					alt: "post"
				});

				third1.append(imgp);
				thirdDiv.append(third1); // apppend section 3

				const forthDiv = $('<div>').addClass('row post-actions');

				const forth1 = $('<div>').addClass('col-xs-4');
				const sp1 = $('<span>').addClass('add glyphicon glyphicon-heart').text('50');

				forth1.append(sp1);

				const forth2 = $('<div>').addClass('col-xs-6');
				const sp2 = $('<span>').addClass('add glyphicon glyphicon-comment').text('50');
				forth2.append(sp2);

				const forth3 = $('<div>').addClass('col-xs-2');
				const sp3 = $('<span>').addClass('glyphicon glyphicon-info-sign').text('50');
				forth3.append(sp3);

				forthDiv.append(forth1, forth2, forth3); // section append 4

				// create section and append all
				const imageSection = $('<section>').addClass('col-lg-4 col-md-5').attr({
					id: 'mypost'
				});

				imageSection.append(firstDiv, secondDiv, thirdDiv, forthDiv);

				const finall = $('#dynamic');
				finall.append(imageSection);



			}
		});
	} catch (error) {
		console.error('Error fetching images: ', error);
	}



	// dynamically fill video post
        try {
                let allVideo = await getVideoPost();
		$('#video-dynamic').empty();


                // loop through each image
                $.each(allVideo, async function(index, video) {
                        // call userByid(id) fuction to get a user of this image
                        const user = await userByid(video.user_id);
                        // check if this user belongs to this county
                        if (user.ward_id == wardId) {
                                // populate the page with this post
                                const firstDiv = $('<div>').addClass('row').attr({
                                        id: "profile"
                                })

                                const first1 = $('<div>').addClass('col-xs-3').attr({
                                        id: 'img'
                                });

                                const myProfile = await getProfile(user.id);
                                // default url for profile
                                let pUrl = 'http://127.0.0.1:5001/api/v1/uploads/logo.jpg'
                                if (myProfile) {
                                        pUrl = "http://127.0.0.1:5001/api/v1/uploads/" + myProfile.url;
                                }

                                const img = $('<img>').addClass('profile-img img-responsive').attr({
                                        id: "pro",
                                        src: pUrl,
                                        alt: 'myprofile'
                                });

                                // will be append to firstDiv
                                first1.append(img);

                                const first2 = $('<div>').addClass('col-xs-5').attr({
                                        id: 'details'
                                });
                                const h6 = $('<h6>').text(user.user_name);
                                const p = $('<p>').text('ward: ' + wardObj.name);
                                // will be appended to firstDiv
                                first2.append(h6, p);

                                const first3 = $('<div>').addClass('col-xs-2').attr({
                                        id: "status"
                                });

                                const spn1 = $('<span>').addClass('glyphicon glyphicon-star');
                                // will be appended to firstDiv
                                first3.append(spn1);

                                const first4 = $('<div>').addClass('col-xs-2');
                                const spn2 = $('<span>').addClass('glyphicon glyphicon-remove rmv');

                                first4.append(spn2);

                                // append to fisrtDiv
                                firstDiv.append(first1, first2, first3, first4); // first section append 1

                                const secondDiv = $('<div>').addClass('row post-content');

                                const second1 = $('<div>').addClass('col-xs-12');
                                const ptext = $('<p>').text(image.description);

                                second1.append(ptext);

                                secondDiv.append(second1); // section append 2

                                const thirdDiv = $('<div>').addClass('row post-video')

                                const third1 = $('<div>').addClass('col-xs-12');
                                const vid = $('<video>').addClass('img-responsive');
				vid.attr('controls', true,);

				const source = $('<source>').attr({
					src: "http://127.0.0.1:5001/api/v1/uploads/" + video.url,
					type: 'video/mp4'
				});

				vid.append(source);

                                third1.append(vid);
                                thirdDiv.append(third1); // apppend section 3

                                const forthDiv = $('<div>').addClass('row post-actions');

                                const forth1 = $('<div>').addClass('col-xs-4');
                                const sp1 = $('<span>').addClass('add glyphicon glyphicon-heart').text('50');

                                forth1.append(sp1);

                                const forth2 = $('<div>').addClass('col-xs-6');
                                const sp2 = $('<span>').addClass('add glyphicon glyphicon-comment').text('50');
                                forth2.append(sp2);

                                const forth3 = $('<div>').addClass('col-xs-2');
                                const sp3 = $('<span>').addClass('glyphicon glyphicon-info-sign').text('50');
                                forth3.append(sp3);

                                forthDiv.append(forth1, forth2, forth3); // section append 4

                                // create section and append all
                                const imageSection = $('<section>').addClass('col-lg-4 col-md-5').attr({
                                        id: 'mypost'
                                });
                                imageSection.append(firstDiv, secondDiv, thirdDiv, forthDiv);

                                const finall = $('#video-dynamic');
                                finall.append(imageSection);



                        }
                });
        } catch (error) {
                console.error('Error fetching images: ', error);
        }

});
