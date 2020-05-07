//获取节点
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  plan = document.getElementById("plan");

//showTime函数
function showTime() {
  //   let today = new Date(2020, 3, 23, 06, 30, 45);
  let today = new Date();
  const hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}`;
}

//addZero函数
function addZero(n) {
  return n < 10 ? "0" + n : n;
}

//设置背景及问候语函数
function setBgGreet() {
  //   let today = new Date(2020, 3, 23, 06, 30, 45);
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    document.body.style.background =
      "url(./img/moring.jpg) no-repeat center center/cover";
    greeting.textContent = "早上好,";
  } else if (hour == 12) {
    document.body.style.background =
      "url(./img/noon.jpg) no-repeat center center/cover";
    greeting.textContent = "中午好,";
  } else if (hour < 18) {
    document.body.style.background =
      "url(./img/afternoon.jpg) no-repeat center center/cover";
    greeting.textContent = "下午好,";
  } else {
    document.body.style.background =
      "url(./img/night.jpg) no-repeat center center/cover";
    greeting.textContent = "晚上好,";
  }
}

//获得本地姓名
function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    name.textContent = "...";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

//设置姓名
function setName(e) {
  if (e.type === "keypress") {
    if (e.keyCode == 13 || e.which == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

//获得本地计划
function getPlan() {
  if (
    localStorage.getItem("plan") === null ||
    localStorage.getItem("plan") === ""
  ) {
    plan.textContent = "Plan?";
  } else {
    plan.textContent = localStorage.getItem("plan");
  }
}

//设置计划
function setPlan(e) {
  if (e.type === "keypress") {
    if (e.keyCode == 13 || e.which == 13) {
      localStorage.setItem("plan", e.target.innerText);
      plan.blur();
    }
  } else {
    localStorage.setItem("plan", e.target.innerText);
  }
}

//事件监听
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
plan.addEventListener("keypress", setPlan);
plan.addEventListener("blur", setPlan);

//运行
setInterval(() => {
  showTime();
}, 1000);
setBgGreet();
getName();
getPlan();
