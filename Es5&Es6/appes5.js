//课程构造函数
function Course(title, link, isbn) {
  this.title = title;
  this.link = link;
  this.isbn = isbn;
}

//UI构造函数
function UI() {}

//添加方法
UI.prototype.addCourseToList = function (course) {
  const list = document.getElementById("course-list");
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${course.title}</td>
  <td><a href="${course.link}">查看</a></td>
  <td>${course.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

//弹窗提醒
UI.prototype.showAlert = function (message, className) {
  //创建div
  const div = document.createElement("div");
  //添加类
  div.className = `alert ${className}`;
  //添加文本
  div.appendChild(document.createTextNode(message));
  //获取父级元素
  const container = document.querySelector(".container");
  //获取表单元素
  const form = document.querySelector("#course-form");
  //插入DOM
  container.insertBefore(div, form);
  //清除
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
};

//清除表单
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("isbn").value = "";
};

//删除方法
UI.prototype.deleteCourse = function (target, ui) {
  if (target.className == "delete") {
    target.parentElement.parentElement.remove();
    ui.showAlert("删除成功", "success");
  }
};

//添加submit 事件
document.getElementById("course-form").addEventListener("submit", function (e) {
  //阻止默认事件
  e.preventDefault();
  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;
  const isbn = document.getElementById("isbn").value;

  //实例化Course
  const course = new Course(title, link, isbn);
  //实例化 UI
  const ui = new UI();

  //校验
  if (title == "" || link == "" || isbn == "") {
    //弹窗提醒
    ui.showAlert("请填写内容", "error");
  } else {
    ui.addCourseToList(course);
    //弹窗提醒
    ui.showAlert("添加成功", "success");
    //清除表单
    ui.clearFields();
  }
});

//获取course-list
document.getElementById("course-list").addEventListener("click", function (e) {
  //初始化UI
  const ui = new UI();
  ui.deleteCourse(e.target, ui);
});
