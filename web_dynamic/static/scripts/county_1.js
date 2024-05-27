// wait for the DOM  o load
$(document).ready(function() {
    $('.delete-conv').on('click', function() {
        $(this).closest('.conversation-section').hide();
        $('#messages').show();
    })

    $('.edit').on('click', function() {
        alert('Edit functionality to be implemented.');
    })
});