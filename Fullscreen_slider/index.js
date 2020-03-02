const slides = document.querySelectorAll(".slide")
const next = document.querySelector("#next")
const prev = document.querySelector("#prev")

const nextSlide = function () {
    //get current class
    const current = document.querySelector(".current")

    if (current.nextElementSibling) {
        //add current to next sibling
        current.nextElementSibling.classList.add("current")
    } else {
        //add current to start
        slides[0].classList.add("current")
    }

    setTimeout(() => {
        //clear current
        current.classList.remove("current")
    })
}

const prevSlide = function () {
    //get current class
    const current = document.querySelector(".current")

    if (current.previousElementSibling) {
        //add current to prev sibling
        current.previousElementSibling.classList.add("current")
    } else {
        //add current to end
        slides[slides.length - 1].classList.add("current")
    }

    setTimeout(() => {
        //clear current
        current.classList.remove("current")
    })
}

//button event
next.addEventListener("click", function () {
    nextSlide()
})

prev.addEventListener("click", function () {
    prevSlide()
})