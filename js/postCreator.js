function createPost(postTitleContent, postSummaryContent,
    hashtagsContent, postDateContent, link, postIconSource) {
    // Create the outermost div with class 'post'
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    // Create the 'title-content' div - contains icon, title and date
    const titleContentDiv = document.createElement('div');
    titleContentDiv.className = 'title-content';

    // Create post icon
    const postImage = document.createElement('img');
    postImage.src = postIconSource;

    // Create the 'post-title' h2 element and set its text content
    const postTitle = document.createElement('h2');
    postTitle.textContent = postTitleContent;

    // Create the date p
    const dateElement = document.createElement('p');
    dateElement.textContent = postDateContent

    postDiv.addEventListener('click', function(){
        window.location.href = link;
    })

    // Create the 'post-summary' paragraph and set its text content
    const postSummary = document.createElement('p');
    postSummary.className = 'post-summary';
    postSummary.textContent = postSummaryContent;

    // Append elements to build the structure
    postDiv.appendChild(titleContentDiv);
    titleContentDiv.appendChild(postImage);
    titleContentDiv.appendChild(postTitle);
    titleContentDiv.appendChild(dateElement);
    postDiv.appendChild(postSummary)

    return(postDiv);
}

function clearPosts(postContainerId = 'posts') {
    // Get a reference to the container element you want to remove all child elements from
    const container = document.getElementById(postContainerId);

    // Loop through all child elements of the container and remove them
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}