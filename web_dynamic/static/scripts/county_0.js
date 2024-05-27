$(document).ready(function() {
    $('#home-btn').on('click', function(e) {
        e.preventDefault();
        $('#image').show();
        $('#video').hide();
        $('#home-btn span').addClass('active-icon');
        $('#video-btn span').removeClass('active-icon');
    });
    
    $('#video-btn').on('click', function(e) {
        e.preventDefault();
        $('#image').hide();
        $('#video').show();
        $('#video-btn span').addClass('active-icon');
        $('#home-btn span').removeClass('active-icon');
    });
    $('.rmv').on('click', function() {
        $(this).closest('#mypost').remove();
    } )
});

// handles the msg displays
$(document).ready(function() {
    $('.message-item').on('click', function() {
        var sender = $(this).data('sender');
        var message = $(this).data('message');

        $('#conversation-sender').text(sender);
        $('#conversation-messages').html('<p>' + message + '</p>');
        $('.conversation-section').show();
        $('#messages').hide();
    });
});