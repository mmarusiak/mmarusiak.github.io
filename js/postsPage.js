const allHashtags = [];
const postsPerPage = 3

var postsArray;
var currentPosts;
var currentSortMethod = '1';
var currentHashtag = 'none'
var ready = false;
var currentPage = 1


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
        const newDiv = document.createElement('div')
        newDiv.className = 'hashtag-body'
        hashtagsHolder.appendChild(newDiv)
        const newP = document.createElement('p');
        newDiv.appendChild(newP);
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

function displayPosts(allCurrentPosts, targetPage = 1){
    const postsHolder = document.getElementById('posts');

    const expectedLastPostNumber = targetPage * postsPerPage;
    const expectedFirstPostNumber = (targetPage-1) * postsPerPage

    let postsToDisplay = Object.values(allCurrentPosts);
    currentPage = targetPage;

    if (postsToDisplay.length <= expectedLastPostNumber){
        postsToDisplay = postsToDisplay.slice(expectedFirstPostNumber);
    }
    else {
        postsToDisplay = postsToDisplay.slice(expectedFirstPostNumber, expectedLastPostNumber);
    }

    postsToDisplay.forEach((post) => {
        const postElement = createPost(post.title, post.content, post.hashtags, post.date, post.source, post.postIcon);
        postsHolder.appendChild(postElement);
    });

    createPageNavigation();
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

function createPageNavigation(){
    const holder = document.getElementById('pages-holder');

    holder.innerHTML = '';
    holder.childNodes = [];

    const startPage = 1;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const lastPage = Math.ceil(currentPosts.length/postsPerPage);

    const pageNumbers = [];

    pageNumbers.push(startPage);

    // we don't want to have multiple navs of same page
    if (previousPage > 1)
        pageNumbers.push(previousPage);

    if (currentPage != startPage && currentPage != lastPage)
        pageNumbers.push(currentPage);

    if (nextPage < lastPage)
        pageNumbers.push(nextPage);
    
    if (lastPage != startPage)
        pageNumbers.push(lastPage);
    
    for(const pageNumber of pageNumbers){
        const newPageNav = document.createElement('n');
        newPageNav.innerHTML = pageNumber;

        newPageNav.style = 'margin-right: 10px; margin-left: 10px;';
        if (pageNumber == currentPage)
            newPageNav.style = 'text-decoration: underline; margin-right: 10px; margin-left: 10px; color: #463f3a;';
        
        newPageNav.id = 'post-number';

        newPageNav.addEventListener('click', function(){
            clearPosts();
            displayPosts(currentPosts, pageNumber);
        });

        holder.appendChild(newPageNav);
    }
}

function moveToPreviousPage(){
    if (currentPage == 1)
        return;
    clearPosts();
    displayPosts(currentPosts, currentPage - 1);
}

function moveToNextPage(){
    if (currentPage == Math.ceil(currentPosts.length/postsPerPage))
        return;
    clearPosts();
    displayPosts(currentPosts, currentPage + 1)
}

async function main(){
    await fetchAndProcessPosts();
    await getDataFromLink();
}

main();