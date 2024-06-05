// wait for the DOM to load
$(document).ready(async function() {
	// function to fetch county by id
	async function fetchCounty(id) {
		try {
			const response = await $.ajax({
				url: `http://127.0.0.1:5001/api/v1/counties/${id}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			return response;
		} catch (error) {
			console.error('Error getting county:', error);
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

	let count = 0;
	// call getImages() to fetch all images
	try {
		const image = await getImages();

		// loop though each image
		// only 4 images required 

		for (const img of image) {
			// break the loop if only 4 images are added
			if (count >= 6) {
				return false;
			}
                        // get user by img.user_id
			const user = await userByid(img.user_id);

			// get county by user.county_id
			const  countyObj = await fetchCounty(user.county_id);
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

			const imgP = $('<img>').addClass('img-responsive').attr({
				id: "pro",
				src: pUrl,
				alt: 'myprofile'
			});

			// will be append to firstDiv
			first1.append(imgP);

			const first2 = $('<div>').addClass('col-xs-5').attr({
				id: 'details'
			});
			const h6 = $('<h6>').text(user.user_name);
			const p = $('<p>').text('County: ' + countyObj.name);
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
			const ptext = $('<p>').text(img.description);

			second1.append(ptext);

			secondDiv.append(second1); // section append 2

			const thirdDiv = $('<div>').addClass('row post-image')

			const third1 = $('<div>').addClass('col-xs-12');

			const imgp = $('<img>').addClass('img-responsive').attr({
				src: "http://127.0.0.1:5001/api/v1/uploads/" + img.url,
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

			const finall = $('#post');
			finall.append(imageSection);
                        count ++;

		}
	} catch (error) {
		console.error('Error getting imageas: ', error);
	}
});
