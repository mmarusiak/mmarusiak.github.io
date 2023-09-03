function hashtagLoader(){
    const allHashtagsItems = document.getElementsByClassName('hashtags');
    for (var hashtagsGroup of allHashtagsItems){
        const hashtagsOfGroup = hashtagsGroup.children;
        for (var hashtagElement of hashtagsOfGroup){
            hashtagElement.className = hashtagElement.textContent.replace('#', '') + '-class';
            encodeFilter(hashtagElement.textContent);
        }
    }
}

function encodeFilter (hashtag){
    const hashtagClass = hashtag.replace('#', '') + '-class';
    const allHashtags = document.getElementsByClassName(hashtagClass);
    for (var hashtagElement of allHashtags){
        hashtagElement.addEventListener('click', function(){
            document.location.href = '/all-posts?hashtag-filter=' + hashtag;
        });
    }
}