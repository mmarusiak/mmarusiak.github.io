async function getPostsInfo(ids = ['post-title', 'post-summary'], hashtagClass = 'hashtag') {
    const response = await fetch('./Posts/posts.json');
    const fileList = await response.json();

    const posts = [];

    for (const fileName of fileList) {
        const fileResponse = await fetch(fileName);
        const fileText = await fileResponse.text();


        const parser = new DOMParser();
        const doc = parser.parseFromString(fileText, 'text/html');
        const post = { title: "title", content: "content", source: "source", hashtags: [] }
        for (const id of ids) {
            const element = doc.getElementById(id);
            if (element) {
                if (ids.indexOf(id) == 0) {
                    post.title = element.textContent;
                } else {
                    post.content = element.textContent;
                }
            }
        }
        const hashElements = doc.getElementsByClassName(hashtagClass);
        for (const hashElement of hashElements) {
            post.hashtags.push(hashElement.textContent);
        }
        post.source = fileName;
        posts.push(post);
    }
    return posts;
}

function loadHashtags(divHashtag, hashtags) {
    console.log(hashtags)
    for (let i = 0; i < hashtags.length; i++) {
        const newP = document.createElement("p");
        newP.textContent = hashtags[i];
        divHashtag.appendChild(newP);
    }
}