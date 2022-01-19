let title = document.querySelector('.title');
let description = document.querySelector('.description');
let listOFComments = document.querySelector(".listOfComments");
let enterOfComment = document.querySelector(".enterOfComment");
let btn = document.querySelector(".btn")
let urlComments = 'https://jsonplaceholder.typicode.com/comments'
let urlPosts = 'https://jsonplaceholder.typicode.com/posts'

class Post {
    constructor(el) {
        this.elem = el;
    }

    renderTitle(el) {
        el = `${el.title}`;
        title.innerText = el;
    }

    renderDescription(el) {
        el = `${el.body}`;
        description.innerText = el;
    }

    getCommentsOfPost(arr, id) {
        return arr.filter(item => item.postId === id)
    }

    renderCommentsOfPost(arr, id) {
        let commentsOfPost = post.getCommentsOfPost(arr, id)
        let comments = '';
        if (commentsOfPost) {
            for (let el of commentsOfPost) {
                if (!el) {
                    return;
                }
                comments += `<li data-postId="${el.postId}">${el.body}</li>`;
            }
        }
        listOFComments.innerHTML = comments;
    }

    renderComment(el, id) {
        let comment = `<li data-postId="${id}">${el}</li>`;
        listOFComments.insertAdjacentHTML("beforeend", comment)
    }
}

let post = new Post()

class Comment {
    constructor(id) {
        {
            this.name = '',
                this.email = '',
                this.body = enterOfComment.value,
                this.postId = id
        }
    }
}

async function addComment(id) {
    let response = await fetch(urlComments, {
        method: 'POST',
        body: JSON.stringify(new Comment(id)),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    if (response.ok) {
        let comment = await response.json();
        post.renderComment(comment.body, id)
        enterOfComment.value = ''
    } else {
        console.error('Error')
    }
}

async function showPost(id) {
    let response = await fetch(urlPosts)
    if (response.ok) {
        let posts = await response.json()
        post.renderTitle(posts[id - 1])
        post.renderDescription(posts[id - 1])
    } else {
        console.error('Error')
    }
}

showPost(1)

async function getComments(id) {
    let response = await fetch(urlComments)
    if (response.ok) {
        let comments = await response.json()
        post.renderCommentsOfPost(comments, id)
    } else {
        console.error('Error')
    }
}

getComments(1)

btn.addEventListener('click', () => {
    addComment(1)
})

console.log(1);

setTimeout(function () {
    console.log(2);
}, 100);

setTimeout(function () {
    console.log(3);
}, 0);

setTimeout(function () {
    new Promise(function (resolve) {
        resolve();
    }).then(() => {
        console.log(4);
    });
}, 0);

console.log(5);
