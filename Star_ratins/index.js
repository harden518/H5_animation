//第一步
const ratings = {
  vue: 4.7,
  node: 3.4,
  jquery: 2.3,
  djingo: 3.6,
  flutter: 4.1
};

//第二步 设置总分量
const starsTotal = 5;

//第四步 获取form-group节点
const productSelect = document.getElementById("produce-select");
const ratingControl = document.getElementById("rating-control");

let product;

//第五步 下拉框事件监听
productSelect.addEventListener("change", e => {
  product = e.target.value;
  // console.log(product)
  //启动inout输入框设置分数
  ratingControl.disabled = false;
  ratingControl.value = ratings[product];
});

//第六步 更改分数
ratingControl.addEventListener("blur", e => {
  const rating = e.target.value;
  //设置分数界限
  if (rating > 5) {
    alert("请注意评分在0-5之间");
    return;
  }

  //修改分数
  ratings[product] = rating;
  getRatings();
});

document.addEventListener("DOMContentLoaded", getRatings);
//第三步 设置评分函数
function getRatings() {
  for (let rating in ratings) {
    //获得分数百分比
    const starPercentage = (ratings[rating] / starsTotal) * 100;
    // console.log(starPercentage);
    //获得四舍五入到十位到分数百分比
    const starPercentRounded = `${Math.round(starPercentage / 10) * 10}%`;
    // console.log(starPercentRounded);
    //点亮星标宽度等于分数百分比
    document.querySelector(
      `.${rating} .stars-inner`
    ).style.width = starPercentRounded;
    //插入分数更新节点
    document.querySelector(`.${rating} .number-rating`).innerHTML =
      ratings[rating];
  }
}
