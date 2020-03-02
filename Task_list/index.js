// 获取节点
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// 加载所有事件监听
loadEventListeners();

//加载所有事件监听函数
function loadEventListeners() {
  //DOM内容加载完毕执行
  document.addEventListener("DOMContentLoaded", getTask);
  // 添加任务事件
  form.addEventListener("submit", addTask);
  //清除任务事件 (单个)
  taskList.addEventListener("click", removeTask);
  //清除所有任务
  clearBtn.addEventListener("click", clearTasks);
  //过滤任务
  filter.addEventListener("keyup", filterTasks);
}

//addTask
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("add a task");
  } else {
    //创建节点
    const li = document.createElement("li");
    //添加li 类名
    li.className = "collection-item";
    //创建文本节点 插入li中
    li.appendChild(document.createTextNode(taskInput.value));
    //创建a标签
    const link = document.createElement("a");
    //添加a标签的类名
    link.className = "delete-item secondary-content";
    //添加字体图标
    link.innerHTML = "<i class='fa fa-times'></i>";
    li.appendChild(link);
    //将li插入ul
    taskList.appendChild(li);
    //将添加任务进行本地存储
    storeTaskInLocalStorage(taskInput.value);
    //清除input
    taskInput.value = "";
  }
}

//removeTask
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log(e.target)
    if (confirm("Are You sure")) {
      e.target.parentElement.parentElement.remove();
      //删除本地存储任务
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//clearTasks
function clearTasks() {
  //方法1
  //   taskList.innerHTML = "";

  //方法2 (更快)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //清除所有本地存储任务
  clearTasksFromLocalStorage();
}

//filterTasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    // console.log(item)
    if (item.toLocaleLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//storeTaskInLocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//getTask
function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    //创建节点
    const li = document.createElement("li");
    //添加li 类名
    li.className = "collection-item";
    //创建文本节点 插入li中
    li.appendChild(document.createTextNode(task));
    //创建a标签
    const link = document.createElement("a");
    //添加a标签的类名
    link.className = "delete-item secondary-content";
    //添加字体图标
    link.innerHTML = "<i class='fa fa-times'></i>";
    li.appendChild(link);
    //将li插入ul
    taskList.appendChild(li);
  });
}

//removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clearTasksFromLocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
