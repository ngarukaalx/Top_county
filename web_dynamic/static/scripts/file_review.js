$(document).ready(function() {
    // handles the image review display
    $(document).on('change', '#image-input', function(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = $('<img>').addClass('img-rounded img-responsive').attr({
                    alt: "Image preview",
                    src: e.target.result
                });
                // remove recent review if any
                $('#preview-type').empty();
                $('#preview-type').append(img);
            };
            reader.readAsDataURL(input.files[0]);
        }
    });

    // handles the video review display
    $(document).on('change', '#video-input', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Remove any existing video preview
                $('#video-preview-container').empty();

                // Create a new video element
                const videoElement = $('<video>', {
                    controls: true,
                    width: 400,
                    src: e.target.result
                }).addClass('img-responsive');

                // Append the video element to the preview container
                $('#video-preview-container').append(videoElement);
            };
            reader.readAsDataURL(file);
        }
    });

});

