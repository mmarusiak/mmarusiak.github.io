const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'
]

async function getPostsInfo(ids = ['post-title', 'post-summary', 'date', 'icon-img'], hashtagClass = 'hashtag') {
    const response = await fetch('./Posts/posts.json');
    const fileList = await response.json();

    const posts = [];

    for (const fileName of fileList) {
        const fileResponse = await fetch(fileName);
        const fileText = await fileResponse.text();


        const parser = new DOMParser();
        const doc = parser.parseFromString(fileText, 'text/html');
        const post = 
        {
             title: "title", 
             content: "content", 
             date: "post-date", 
             dateConverted: "date-converted", 
             source: "source", 
             hashtags: [],
             postIcon : "" 
            }
        for (const id of ids) {
            const element = doc.getElementById(id);
            if (element) {
                if (ids.indexOf(id) == 0) {
                    post.title = element.textContent;
                } else if (ids.indexOf(id) == 1){
                    post.content = element.textContent;
                }else if (ids.indexOf(id) == 2){
                    post.date = element.textContent;
                }else{
                    post.postIcon = element.src;
                }
            }
        }
        const hashElements = doc.getElementsByClassName(hashtagClass);
        for (const hashElement of hashElements) {
            post.hashtags.push(hashElement.textContent);
        }
        post.source = fileName;
        post.dateConverted = getDateFromRaw(post.date);
        
        posts.push(post);
    }
    return posts;
}

function getDateFromRaw(rawDate){
    const dateSliced = rawDate.split(' ');
    const month = months.indexOf(dateSliced[0]) + 1;
    let monthStr = month.toString();
    if(month < 10){
        monthStr = '0' + monthStr;
    }
    const day = dateSliced[1];
    const year = dateSliced[2];

    const fullDate = year + '-' + monthStr + '-' + day;
    const date = new Date(fullDate);
    return(date);
}

function loadHashtags(divHashtag, hashtags) {
    console.log(hashtags)
    for (let i = 0; i < hashtags.length; i++) {
        const newP = document.createElement("p");
        newP.textContent = hashtags[i];
        divHashtag.appendChild(newP);
    }
}