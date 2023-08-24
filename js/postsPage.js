async function fetchAndProcessPosts(){
    const posts = await getPostsInfo();
    const postsArray = Object.values(posts);

    const allHashtags = [];

    // sort array from newest to oldest
    postsArray.sort((a, b) => b.dateConverted - a.dateConverted);

    // here we should do some lookup table fancy thingy :)
    postsArray.forEach((post) => {
        post.hashtags.forEach((hashtag) => {
            if (!allHashtags.includes(hashtag)){
                allHashtags.push(hashtag);
            }
        })
    })

    const hashtagsHolder = document.getElementById('hashtag-holder');

    allHashtags.forEach((hashtag) => {
        const newP = document.createElement('p');
        hashtagsHolder.appendChild(newP);
        newP.textContent = hashtag;
        newP.addEventListener('click', function() {filterByHashtag(hashtag)});
    });

    //clearPosts();

    console.log(postsArray);
    console.log(allHashtags)
}

function filterByHashtag(hashtagName){
    console.log('clicked: ' + hashtagName);
}

function sortBy(sort){
    console.log(sort);
}

fetchAndProcessPosts();