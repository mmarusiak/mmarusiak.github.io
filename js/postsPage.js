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

    console.log(postsArray);
    console.log(allHashtags)
}

fetchAndProcessPosts();