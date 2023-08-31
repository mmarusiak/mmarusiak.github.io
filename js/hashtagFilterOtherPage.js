function hashtagLoader(){
    const allHashtagsItems = document.getElementsByClassName('hashtags');
    for (var hashtagsGroup of allHashtagsItems){
        const hashtagsOfGroup = hashtagsGroup.children;
        for (var hashtagElement of hashtagsOfGroup){
            hashtagElement.className = hashtagElement.textContent.replace('#', '') + '-class';
            hashtagElement.setAttribute('data-url', '/all-posts.html')
            encodeFilter(hashtagElement.textContent);
        }
    }
}

function encodeFilter (hashtag){
    const hashtagClass = hashtag.replace('#', '') + '-class';
    const allHashtags = document.getElementsByClassName(hashtagClass);
    for (var hashtagElement of allHashtags){
        hashtagElement.addEventListener('click', function(){
            var url = $(this).data('url');
            document.location.href = url + '?hashtag-filter' + hashtag;
        });
    }
}