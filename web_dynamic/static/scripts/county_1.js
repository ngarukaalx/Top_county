// wait for the DOM  o load
$(document).ready(function() {
    $(document).on('click', '.delete-conv', function() {
        $(this).closest('.conversation-section').hide();
        $('#messages').show();
    })

    $(document).on('click', '.edit', function() {
        alert('Edit functionality to be implemented.');
    })
});
