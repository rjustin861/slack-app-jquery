let messages = [];
let channels = [];

const loadData = () => {
    return $.ajax({
        method: 'GET',
        url: 'data/data.json',
        async: false
    }).done(function(response) {
        // console.log('response', response);
        messages = response;

        let mappedMessages = messages.map((message) => message.channel);
        channels = mappedMessages.filter((v, i) => mappedMessages.indexOf(v) == i);

        // console.log('channels', channels);

        channels.forEach((channel) => {
            let li = $(`<li><a href='#' class='channel' id='${channel}'>${channel}</a></li>`);
            $('#channel-container').append(li);
        });
    });
}

const displayMessages = (channelId) => {
    let filteredMessage = messages.filter((message) => message.channel == channelId);

    $('#message-container').html('');

    filteredMessage.forEach((message) => {
        let li = $(`<li class='message'><div class='messageFrom'>${message.email}</div><div class='messageBody'>${message.body}</div><span class='like text'>0</span><span class='text'> likes</span><button type='button' class='btn btn-info btn-sm btn-likes'>Like</button><button type='button' class='btn btn-danger btn-sm btn-remove'>Delete</button></li>`);
        $('#message-container').append(li);
    });
}

$(document).on('keypress', function(e) {
    if(e.which == 13) {
        let message = $('#message-box').val();
        let li = $(`<li class='message hidden'><div class='messageFrom'>ryan.justin@ymail.com</div><div class='messageBody'>${message}</div><span class='like text'>0</span><span class='text'> likes</span><button type='button' class='btn btn-info btn-sm btn-likes'>Like</button><button type='button' class='btn btn-danger btn-sm btn-remove'>Delete</button></li>`);
        $('#message-container').append(li);
        li.fadeIn(500);

        $('#message-container').animate({scrollTop: $('#message-container').prop("scrollHeight")}, 500);

        $('#message-box').val('');
    }
})

$(document).on('click', 'button.btn-remove', function(e) {
    $(this).parent().detach();
})

$(document).on('click', 'button.btn-likes', function(e) {
    let like = $(this).prevAll('.like').html();
    $(this).prevAll('.like').html(++like);
})

$(document).on('click', 'a.channel', function(e) {
    $('a.channel').parent().removeClass('highlight');
    $(this).parent().addClass('highlight')
    displayMessages($(this).attr('id'));
})

loadData();