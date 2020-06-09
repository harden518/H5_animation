const posts = [
  {
    title: "第一篇",
    body: "这是第一篇博客",
  },
  {
    title: "第二篇",
    body: "这是第二篇博客",
  },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback()
  }, 2000);
}

// getPosts();

createPost({ title: "第三篇", body: "这是第三篇博客" },getPosts);
