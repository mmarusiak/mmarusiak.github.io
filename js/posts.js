async function getTextFromElementsWithId(ids) {
    const response = await fetch('./Posts/posts.json');
    const fileList = await response.json();

    const textContents = [];

    for (const fileName of fileList) {
        const fileResponse = await fetch(fileName);
        const fileText = await fileResponse.text();
        

        const parser = new DOMParser();
        const doc = parser.parseFromString(fileText, 'text/html');
        post = {title : "title", content : "content", source : "source"}
        for (const id of ids){
            const element = doc.getElementById(id);
            if (element) {
                if(ids.indexOf(id) == 0){
                    post.title = element.textContent;
                }else{
                    post.content = element.textContent;
                }
            }
        }
        post.source = fileName;
        textContents.push(post);
    }

    return textContents;
}