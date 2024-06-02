$(document).ready(function () {
    $('#fa-video').on('click', function() {
        const formType = $('#post-form');
        formType.empty();
        formType.attr({
            enctype: "multipart/form-data"
        });
        // add content dynamically
        const firstDiv = $('<div>').addClass('form-group');
        // create a label
        const label = $('<label>').attr({for: 'description'}).text('Description')
        const textArea = $('<textarea>').addClass('form-control').attr({id: 'description', rows: "3"});

        // append to firstDiv
        firstDiv.append(label, textArea); // first append to form

        // second div
        const secondDiv = $('<div>').addClass('form-group').attr({id: "post-video"})
        const label1 = $('<label>').attr({for: "video-input"}).text('Upload Video');
        const input = $('<input>').addClass('form-control-file').attr({
            type: "file",
            id: "video-input",
            accept: "video/*"
        });
        secondDiv.append(label1, input); // second append to form
        // third div
        const thirdDiv = $('<div>').attr({id: 'video-preview-container'});

        // append all elements to form
        formType.append(firstDiv, secondDiv, thirdDiv);

        $('#fa-video').css('color', 'blue');
        $('#fa-font').css('color', 'black');
        $('#fa-image').css('color', 'black'); 
    })

    $('#fa-image').on('click', function() {
        const formType = $('#post-form');
        // clear any resent data
        formType.empty();
        // add content dynamically
        const firstDiv = $('<div>').addClass('form-group');
        // create a label
        const label = $('<label>').attr({for: 'description'}).text('Description')
        const textArea = $('<textarea>').addClass('form-control').attr({id: 'description', rows: "3"});

        // append to firstDiv
        firstDiv.append(label, textArea); // first append to form

        // second div
        const secondDiv = $('<div>').addClass('form-group').attr({id: "post-image"})
        const label1 = $('<label>').attr({for: "image-input"}).text('Upload Image');
        const input = $('<input>').addClass('form-control-file').attr({
            type: "file",
            id: "image-input",
            accept: "image/*"
        });
        secondDiv.append(label1, input); // second append to form
        // third div
        const thirdDiv = $('<div>').attr({id: 'preview-type'});

        // append all elements to form
        formType.append(firstDiv, secondDiv, thirdDiv);
        $('#fa-image').css('color', 'blue');
        $('#fa-font').css('color', 'black');
        $('#fa-video').css('color', 'black');
    })

    $('#fa-font').on('click', function() {
        const formType = $('#post-form');
        // clear any resent data
        formType.empty();
        // add content dynamically
        const firstDiv = $('<div>').addClass('form-group');
        // create a label
        const label = $('<label>').attr({for: 'description'}).text('Description')
        const textArea = $('<textarea>').addClass('form-control').attr({id: 'description', rows: "3"});

        // append to firstDiv
        firstDiv.append(label, textArea); // first append to form

        formType.append(firstDiv);
        $('#fa-font').css('color', 'blue');
        $('#fa-image').css('color', 'black');
        $('#fa-video').css('color', 'black');
    })
});
