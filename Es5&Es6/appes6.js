//课程 类
class Course {
  constructor(title, link, isbn) {
    this.title = title;
    this.link = link;
    this.isbn = isbn;
  }
}

//UI 类
class UI {
  //添加课程方法
  addCourseToList(course) {
    const list = document.getElementById("course-list");
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${course.title}</td>
          <td><a href="${course.link}">查看</a></td>
          <td>${course.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
          `;
    list.appendChild(row);
  }

  //弹窗提醒
  showAlert(message, className) {
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
  }

  //清除表单
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("isbn").value = "";
  }

  //删除方法
  deleteCourse(target, ui) {
    if (target.className == "delete") {
      target.parentElement.parentElement.remove();
      ui.showAlert("删除成功", "success");
    }
  }
}

//缓存 类
class Store {
  //取出缓存
  static getCourses() {
    let courses;
    if (localStorage.getItem("courses") === null) {
      courses = [];
    } else {
      courses = JSON.parse(localStorage.getItem("courses"));
    }
    console.log(courses);
    return courses;
  }
  //存入缓存
  static addCourse(course) {
    const courses = Store.getCourses();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }
  //展示缓存数据
  static displayCourse() {
    const courses = Store.getCourses();
    courses.forEach((course) => {
      const ui = new UI();
      ui.addCourseToList(course);
    });
  }
  //删除缓存
  static removeCourse(isbn) {
    const courses = Store.getCourses();
    courses.forEach((course, index) => {
      if (course.isbn === isbn) {
        courses.splice(index, 1);
      }
    });
    localStorage.setItem("courses", JSON.stringify(courses));
  }
}

//DOM加载事件
document.addEventListener("DOMContentLoaded", Store.displayCourse);

//添加submit 事件
document.getElementById("course-form").addEventListener("submit", (e) => {
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
    //加入缓存
    Store.addCourse(course);
    //弹窗提醒
    ui.showAlert("添加成功", "success");
    //清除表单
    ui.clearFields();
  }
});

//获取course-list
document.getElementById("course-list").addEventListener("click", (e) => {
  //初始化UI
  const ui = new UI();
  ui.deleteCourse(e.target, ui);
  Store.removeCourse(e.target.parentElement.previousElementSibling.textContent);
});
