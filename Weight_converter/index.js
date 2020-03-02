// get input
const jinInput = document.getElementById("jinInput")

//hidden
document.getElementById("outPut").style.visibility = "hidden"

//add event listenner
jinInput.addEventListener("input", function (e) {

    let jinNumer = e.target.value

    if (jinNumer) {
        document.getElementById("outPut").style.visibility = "visible"
    } else {
        document.getElementById("outPut").style.visibility = "hidden"
    }

    let kgOutput = document.getElementById("kgOutput")
    let poundOutput = document.getElementById("poundOutput")
    let ozOutput = document.getElementById("ozOutput")

    kgOutput.innerHTML = jinNumer * 0.5
    poundOutput.innerHTML = jinNumer * 1.1023113
    ozOutput.innerHTML = jinNumer * 17.636981
})