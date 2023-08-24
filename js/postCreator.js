function createPost(postTitleContent, postSummaryContent,
    hashtagsContent, postDateContent) {
    // Create the outermost div with class 'post'
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    // Create the 'post-content' div
    const postContentDiv = document.createElement('div');
    postContentDiv.className = 'post-content';

    // Create the 'upper-post' div
    const upperPostDiv = document.createElement('div');
    upperPostDiv.className = 'upper-post';

    // Create the 'post-title' h1 element and set its text content
    const postTitle = document.createElement('h1');
    postTitle.className = 'post-title';
    postTitle.textContent = postTitleContent;

    // Create the 'right-side-post' div
    const rightSidePostDiv = document.createElement('div');
    rightSidePostDiv.className = 'right-side-post';

    // Create the 'hashtags' div
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'hashtags';

    // Create all hashtags
    hashtagsContent.array.forEach(hashtag => {
        const hashElement = document.createElement('p');
        hashElement.textContent = hashtag;
        hashtagsDiv.appendChild(hashElement);
    });

    // Create the 'post-info' div
    const postInfoDiv = document.createElement('div');
    postInfoDiv.className = 'post-info';

    // Create the 'post-link' h2 element and set its text content
    const postLink = document.createElement('h2');
    postLink.className = 'post-link';
    postLink.textContent = 'go to post';

    // Create the 'post-date' h2 element and set its text content
    const postDate = document.createElement('h2');
    postDate.className = 'post-date';
    postDate.textContent = postDateContent;

    // Create the 'post-summary' paragraph and set its text content
    const postSummary = document.createElement('p');
    postSummary.className = 'post-summary';
    postSummary.textContent = postSummaryContent;

    // Append elements to build the structure
    hashtagsDiv.appendChild(postLink);
    hashtagsDiv.appendChild(postDate);
    rightSidePostDiv.appendChild(hashtagsDiv);
    rightSidePostDiv.appendChild(postInfoDiv);
    upperPostDiv.appendChild(postTitle);
    upperPostDiv.appendChild(rightSidePostDiv);
    postContentDiv.appendChild(upperPostDiv);
    postContentDiv.appendChild(postSummary);
    postDiv.appendChild(postContentDiv);
}

function clearPosts(postContainerId = 'posts') {
    // Get a reference to the container element you want to remove all child elements from
    const container = document.getElementById(postContainerId);

    // Loop through all child elements of the container and remove them
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}