const allHashtags = [];
var postsArray;
var currentPosts;
var currentSortMethod = '1';
var currentHashtag = 'none'
var ready = false;

async function fetchAndProcessPosts(){
    const posts = await getPostsInfo();
    postsArray = Object.values(posts);
    currentPosts = postsArray;

    sortByDate(currentSortMethod);

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
        newP.className = 'hashtag-notset';
        newP.id = hashtag;
        newP.addEventListener('click', function() {filterByHashtag(hashtag)});
    });

    clearPosts();
    displayPosts(postsArray);
    ready = true;
}

async function getDataFromLink(){
    if (!document.location.href.includes('?')) return;
    const urlData = document.location.href.split('?')[1];
    // extract data
    const data = urlData.split('=')[1];
    filterByHashtag(data);
}

function changeHashtagDisplay(oldHashtag, currentHashtag){
    const elements = [document.getElementById(oldHashtag),
                        document.getElementById(currentHashtag)]
    if (oldHashtag == currentHashtag){
        elements[0].className = 'hashtag-notset';
        return;
    }
    else {
        elements[1].className = 'hashtag-set';

        if (oldHashtag != 'none') {
            elements[0].className = 'hashtag-notset';
        }
        return;
    }
}

function displayPosts(postsToDisplay){
    const postsHolder = document.getElementById('posts');
    postsToDisplay.forEach((post) => {
        const postElement = createPost(post.title, post.content, post.hashtags, post.date, post.source, post.postIcon);
        postsHolder.appendChild(postElement);
    });
}

function filterByHashtag(hashtagName){
    console.log('filtering by ' + hashtagName);
    changeHashtagDisplay(currentHashtag, hashtagName)
    if (hashtagName == currentHashtag){
        currentPosts = postsArray;
        currentHashtag = 'none';
        sortBy(currentSortMethod);
        return;
    }

    currentHashtag = hashtagName;

    const newPosts = [];
    postsArray.forEach((post) => {
        if (post.hashtags.includes(hashtagName)){
            newPosts.push(post);
        }
    });

    currentPosts = Object.values(newPosts);

    sortBy(currentSortMethod);
}

function sortBy(sort){
    if (sort == '1' || sort == '2'){
        sortByDate(sort);
    }
    else {
        sortAlphabetical(sort);
    }

    clearPosts();
    displayPosts(currentPosts);
    currentSortMethod = sort;
}

function sortByDate(sort){
    const multiplier = sort == '1' ? 1 : -1;
    currentPosts.sort((a, b) => multiplier * (b.dateConverted - a.dateConverted));
}

function sortAlphabetical(sort){
    const multiplier = sort == '3' ? 1 : -1;
    currentPosts.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) return -1 * multiplier;
        if (titleA > titleB) return 1 * multiplier;
        return 0;
      });
}

function clearFiltering(){
    currentPosts = postsArray;

    sortBy(currentSortMethod);
}

async function main(){
    await fetchAndProcessPosts();
    await getDataFromLink();
}

main();