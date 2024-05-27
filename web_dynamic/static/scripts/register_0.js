// wait for the DOM load
$(document).ready(function() {
    $('#start').on('click', function(e) {
        e.preventDefault();
        $('.login-box').hide();
        $('.first-box').show();
    });
    $('#back1').on('click', function(e) {
        e.preventDefault();
        $('.first-box').hide();
        $('.login-box').show();
    })
    $('.next-button').on('click', function() {
        $('.first-box').hide();
        $('.second-box').show();
    })
    $('.last-link').on('click', function() {
        $('.second-box').hide();
        $('.login-box').show();
    });
    $('#back').on('click', function() {
        $('.second-box').hide();
        $('.first-box').show();
    })
});