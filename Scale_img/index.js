//获取节点
const current = document.getElementById("current");
const imgs = document.querySelector(".imgs");
const img = document.querySelectorAll(".imgs img");
const opacity = 0.6;

img[0].style.opacity = opacity;

//事件监听
imgs.addEventListener("click", imgClick);

//设置imgClick函数
function imgClick(e) {
  //重置缩略图不透明度
  img.forEach(item => {
    item.style.opacity = 1;
  });
  //点击下方缩略图更新上方主体图
  current.src = e.target.src;
  //添加fade类名
  current.classList.add("fade-in");
  //设置定时器移除类名
  setTimeout(() => {
    current.classList.remove("fade-in");
  }, 500);
  //设置点击的缩略图不透明度
  e.target.style.opacity = opacity;
}
