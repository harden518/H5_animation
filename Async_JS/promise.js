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

createPost({ title: "第三篇", body: "这是第三篇博客" })
  .then(getPosts)
  .catch((err) => {
    console.log(err);
  });

//Promise.all()

const promise1 = Promise.resolve("hello world");
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "promise3");
});

const promise4 = fetch(
  "http://jsonplaceholder.typicode.com/users"
).then((res) => res.json());

Promise.all([promise1, promise2, promise3, promise4]).then((res) => {
  console.log(res);
});
