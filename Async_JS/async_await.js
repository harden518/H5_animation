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

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;

      if (!error) {
        resolve();
      } else {
        reject("Error");
      }
    }, 2000);
  });
}

async function init() {
  await createPost({ title: "第三篇", body: "这是第三篇博客" });
  getPosts();
}

init();

async function fetchUsers() {
  const res = await fetch("http://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  console.log(data);
}

fetchUsers();
