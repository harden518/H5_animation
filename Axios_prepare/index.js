// 请求接口 http://jsonplaceholder.typicode.com/todos

axios.defaults.headers.common["X-Auth-Token"] = "123"

// GET 请求
function getTodos() {
    // axios({
    //         method: "get",
    //         url: "http://jsonplaceholder.typicode.com/todos",
    //         params:{
    //             _limit:5
    //         }
    //     })
    //     .then(res => {
    //         console.log(res)
    //         showOutput(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    axios("http://jsonplaceholder.typicode.com/todos?_limit=5", {
            timeout: 5000
        })
        .then(res => {
            showOutput(res)
        })
        .catch(err => {

        })
}

// POST 请求
function addTodo() {
    axios.post("http://jsonplaceholder.typicode.com/todos", {
            title: "hello",
            completed: false
        })
        .then(res => {
            showOutput(res)
        })
        .catch(err => {

        })
}

// PUT/PATCH 请求
function updateTodo() {
    axios.patch("http://jsonplaceholder.typicode.com/todos/1", {
            title: "hello",
            completed: true
        })
        .then(res => {
            showOutput(res)
        })
        .catch(err => {

        })
}

// DELETE 请求
function removeTodo() {
    axios.delete("http://jsonplaceholder.typicode.com/todos/1")
        .then(res => {
            showOutput(res)
        })
        .catch(err => {

        })
}

// 批量请求数据
function getData() {
    axios.all([
            axios.get("http://jsonplaceholder.typicode.com/todos?_limit=5"),
            axios.get("http://jsonplaceholder.typicode.com/posts?_limit=5")
        ])
        // .then(res=>{
        //     showOutput(res[0])
        // })
        .then(
            axios.spread((todos, posts) => {
                showOutput(todos)
            })
        )
        .catch(err => {
            console.log(err)
        })
}

// 自定义请求头
function customHeaders() {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "token"
        }
    }
    axios.post("http://jsonplaceholder.typicode.com/todos", {
            title: "hello",
            completed: false
        }, config)
        .then(res => {
            showOutput(res)
        })
        .catch(err => {

        })
}

// TRANSFORMING 请求 & 响应
function transformResponse() {
    const options = {
        method: "post",
        url: "http://jsonplaceholder.typicode.com/todos",
        data: {
            title: "hello"
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase()
            return data
        })
    }

    axios(options)
        .then(res => {
            showOutput(res)
        })
        .catch(err => {
            console.log(err)
        })
}

// ERROR 处理
function errorHandling() {
    axios("http://jsonplaceholder.typicode.com/todoss")
        .then(res => {
            showOutput(res)
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
                if (err.response.status == 404) {
                    alert("客户端请求出现问题")
                } else if (err.response.status >= 500) {
                    alert("服务端接口出现问题")
                }
            } else if (err.request) {
                console.error(err.request)
            } else {
                console.error(err.message)
            }
        })
}

// CANCEL TOKEN
function cancelToken() {
    const source = axios.CancelToken.source()

    axios("http://jsonplaceholder.typicode.com/todoss", {
            cancelToken: source.token
        })
        .then(res => {
            showOutput(res)
        })
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log("request canceld", thrown.message)
            }
        })

    if (true) {
        source.cancel("请求取消")
    }
}

// 请求拦截
axios.interceptors.request.use(
    config => {
        console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// AXIOS 实例化
const axiosInstance = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com"
})
axiosInstance.get("/comments?_limit=5")
    .then(res => {
        showOutput(res)
    })

// 数据展示
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// 事件监听
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);