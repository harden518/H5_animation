// //初始化对象
// var config={

// }

// firebase.inirializeApp(config)
// //创建一个collection
// var messageRef=firebase.database().ref("message")

//添加submit事件

document.getElementById("contactForm").addEventListener("submit", submitFomr)

function submitFomr(e) {
    e.preventDefault();

    //获取input 值
    var name = getInputVal("name")
    var company = getInputVal("company")
    var email = getInputVal("email")
    var phone = getInputVal("phone")
    var message = getInputVal("message")

    // saveMessage(name,company,email,phone,message)

    //展示alert
    document.querySelector(".alert").style.display = "block"

    //3秒消失alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none"
        document.getElementById("contactForm").reset()
    }, 3000)
}

function getInputVal(id) {
    return document.getElementById(id).value
}

function saveMessage(name, company, email, phone, message) {
    messageRef.push({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message,
    })
}