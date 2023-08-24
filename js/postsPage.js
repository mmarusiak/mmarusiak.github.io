const allHashtags = [];
var postsArray;

async function fetchAndProcessPosts(){
    const posts = await getPostsInfo();
    postsArray = Object.values(posts);

    sortByDate('1');

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

    clearPosts();
    displayPosts(postsArray);

    console.log(postsArray);
    console.log(allHashtags)
}

function displayPosts(postsToDisplay){
    const postsHolder = document.getElementById('posts');
    postsToDisplay.forEach((post) => {
        const postElement = createPost(post.title, post.content, post.hashtags, post.date, post.source);
        postsHolder.appendChild(postElement);
    });
}

function filterByHashtag(hashtagName){
    console.log('clicked: ' + hashtagName);
}

function sortBy(sort){
    if (sort == '1' || sort == '2'){
        sortByDate(sort);
    }
    else {
        sortAlphabetical(sort);
    }

    clearPosts();
    displayPosts(postsArray);
}

function sortByDate(sort){
    const multiplier = sort == '1' ? 1 : -1;
   postsArray.sort((a, b) => multiplier * (b.dateConverted - a.dateConverted));
}

function sortAlphabetical(sort){
    const multiplier = sort == '3' ? 1 : -1;
    postsArray.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) return -1 * multiplier;
        if (titleA > titleB) return 1 * multiplier;
        return 0;
      });
}

fetchAndProcessPosts();