//Start Open and Close Setting Box 
document.querySelector(".icon .fa-gear").onclick = function() {
    this.classList.toggle("fa-spin")
    document.querySelector(".setting").classList.toggle("open")
}
//End Open and Close Setting Box 

// Start Change Background Images 
let landingPage = document.querySelector(".landing-page");
let imagesArray =  ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
let backgroundOption = true;
let backgroundInterval;

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let random = Math.floor(Math.random() * imagesArray.length);
            // landingPage.style.backgroundImage = 'url("images/'+ imagesArray[random] + '")'
            landingPage.style.backgroundImage = `url("images/${imagesArray[random]}")`
        },1000) 
    }
}
randomizeImgs()
// End Change Background Images 

// Start Change Color Box 
let list = document.querySelectorAll(".color-list li")
list.forEach((li) => {
    li.onclick = function(e) {
        // list.forEach((li) => {
        //     li.classList.remove("active")
        // })
        // e.target.classList.add("active");
        handleActive(e)
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        localStorage.setItem("color-option",e.target.dataset.color);
    }
})
let mainColors = localStorage.getItem("color-option")
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color",mainColors)
    list.forEach((li) => {
        li.classList.remove("active")
        if (li.dataset.color === mainColors) {
            li.classList.add("active")
        }
    })
}
// End Change Color Box 

// Start Change Background Color Box 
let randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach((li) => {
    li.onclick = function(e) {
        // randomBackEl.forEach(el => {
        //     el.classList.remove("active")
        // })
        // e.target.classList.add("active")
        handleActive(e)
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs()
            localStorage.setItem("background-option",true)
        }else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background-option",false)
        }
    }
})

let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
    randomBackEl.forEach(el => {
        el.classList.remove("active")
    }) 
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-background .yes").classList.add("active");
        backgroundOption = backgroundLocalItem;
        randomizeImgs()
    }else {
        document.querySelector(".random-background .no").classList.add("active");
        backgroundOption = backgroundLocalItem;
        clearInterval(backgroundInterval)
    }
}
// End Change Background Color Box 

// Start Show Bullets Box 
let ShowListbuttons = document.querySelectorAll(".setting .show-option span")
let navBullets = document.querySelector(".nav-bullets")
ShowListbuttons.forEach(button => {
    button.addEventListener('click',(e) => {
        handleActive(e)
        if(e.target.dataset.show === 'yes') {
            navBullets.style.setProperty("display","block")
            localStorage.setItem("showResult","block")
        }else {
            navBullets.style.setProperty("display","none")
            localStorage.setItem("showResult","none")
        }
        
    })
})
let show = localStorage.getItem("showResult");
if(show !== null) {
    ShowListbuttons.forEach(button => {
        button.classList.remove("active")
    })
    if(show === 'block') {
        document.querySelector(".show-option .yes").classList.add("active")
        navBullets.style.setProperty("display",show)
    }else {
        document.querySelector(".show-option .no").classList.add("active")
        navBullets.style.setProperty("display",show)
    } 
}
// End Show Bullets Box 

// Start Reset Box 
let reset = document.querySelector(".setting .reset-options")
reset.addEventListener('click',(e)=> {
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("showResult");
    window.location.reload()
})
// End Reset Box  


// Start Skill Section 
let ourSkills = document.querySelector(".skills");
window.onscroll = function() {
    let skillsOffsetTop = ourSkills.offsetTop
    let skillsOuterHeight = ourSkills.offsetHeight
    let windowHeight = this.innerHeight
    let windowScrollTop = window.scrollY
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}
// End Skill Section 

// Start Gallary 
let ourGallary = document.querySelectorAll(".gallery img")
ourGallary.forEach(img => {
    img.addEventListener('click',(e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)
        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"
        let popupImage = document.createElement("img")
        popupImage.src =  e.target.src
        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)
        if(img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgHeadingText = document.createTextNode(img.alt)
            imgHeading.append(imgHeadingText);
            popupBox.prepend(imgHeading)
        }
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button"
        popupBox.appendChild(closeButton)
    })
})
document.addEventListener('click',(e) => {
    if(e.target.className === 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})
// End Gallary 

// Start Navigation Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// allBullets.forEach(bullet => {
//     bullet.addEventListener('click', (e) => {
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         })
//     })
// })
// End Navigation Bullets

// Start Links 
let allLinks = document.querySelectorAll(".links a");
// allLinks.forEach(link => {
//     link.addEventListener('click',(e) => {
//         e.preventDefault()
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         })
//     })
// })
// End Links 

// Handle Scroll To SomeWhere
function scrollToSomeWhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener('click',(e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//Start Handle Acive 
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((li) => {
        li.classList.remove("active")
    })
    ev.target.classList.add("active");
}
//End Handle Acive 

let toggleMenu = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")
let linkContainer = document.querySelector(".links-container")

toggleMenu.addEventListener('click', (e) => {
    e.stopPropagation()
    tLinks.classList.toggle("open")
    linkContainer.classList.toggle("open")
})
tLinks.addEventListener('click', (e) => {
    e.stopPropagation()   
})

document.onclick = function(e) {
    if(e.target !== toggleMenu && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            tLinks.classList.toggle("open")
            linkContainer.classList.toggle("open")
        }
    }
}


