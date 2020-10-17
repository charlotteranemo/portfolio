"use strict";

//Imports
import './styles/main.scss';
import cr from './pictures/cr.jpg';

window.addEventListener('scroll', shrinkHeader);
window.addEventListener('load', loadAll);

const headerEl = document.getElementById("header");
const nameLogoEl = document.getElementById("nameLogo");
const menuBtn = document.getElementById("menu-btn");
const webList = document.getElementById("webList");
const eduList = document.getElementById("eduList");
const colorBlockEl = document.getElementById("colorBlock");

//Function that shrinks the header on scroll down
function shrinkHeader() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    headerEl.style.height = "40px";
    headerEl.style.paddingTop = "5px";
    headerEl.style.opacity = "0.9";
    nameLogoEl.style.fontSize = "1.2em";
    nameLogoEl.style.padding = "5px";
    menuBtn.style.top = "3px";
    menuBtn.style.right= "5px";
  } else {
    headerEl.style.height = "65px";
    headerEl.style.paddingTop = "25px";
    headerEl.style.opacity = "1";
    nameLogoEl.style.fontSize = "1.6em";
    nameLogoEl.style.padding = "0px";
    menuBtn.style.top = "20px";
    menuBtn.style.right= "10px";
  }
}

//Borrowed show on scroll-function from online, added compability to Internet Explorer

var scroll = window.requestAnimationFrame ||
    function(callback){ window.setTimeout(callback, 1000/60)};

var elementsToShow = document.querySelectorAll('.showScroll'); //Selects all elements that are going to slide and fade on scroll

var IE = document.getElementById("IEbigText");
var notIE = document.getElementById("bigText");

//This function exists twice, here and at the bottom, for IE support
window.onload = function() {
  if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
    notIE.style.display = "none";
    IE.style.display = "block";
  } else {
    notIE.style.display = "none";
    IE.style.display = "block";
  }
}

function loop() {

  if((navigator.userAgent.indexOf("MSIE") == -1 )) {
    elementsToShow.forEach(function (element) {
      if (isElementInViewport(element)) { //Checks if element is visible on screen, and if so adds CSS
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      } else {
        element.style.transform = "translateY(2em)";
        element.style.opacity = "0";
      }
    });
  }

  

  scroll(loop);
}

loop();

function isElementInViewport(el) { //Function that checks if in viewport
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

//End of show on scroll function

//Loads all courses, work and websites using fetch, from my API
function loadAll() {
    fetch('http://charlotteranemo.se/pRest/websites')
    .then(response => response.json())
    .then(data => 
        data.forEach(web =>
            webList.innerHTML += `<div class="picText"><img src="${web.img}" alt="A website made my me" class="portfolio"></img><a href="${web.url}"><div class="overlay"><div class="text"><h3>${web.name}</h3><p>${web.description}</p></div></div></a></div>`));
            
    fetch('http://charlotteranemo.se/pRest/courses')
    .then(response => response.json())
    .then(data => 
        data.forEach(course =>
            eduList.innerHTML += `<h3>${course.name}</h3><p>${course.start} to ${course.end}</p><p>at ${course.school}</p>`));

    fetch('http://charlotteranemo.se/pRest/work')
    .then(response => response.json())
    .then(data => 
        data.forEach(work =>
            empList.innerHTML += `<h3>${work.name}</h3><p>${work.start} to ${work.end}</p><p>as a ${work.title}</p>`));

    //Displays the image of me in the footer
    colorBlockEl.innerHTML = `<img src="${cr}" alt="A picture of me" id="mePic"><p id="endP">Charlotte Ranemo, Stockholm, Sweden</p>`
}

//Handles the menu on small screens
window.onload = function() {
    let menuBtn = document.getElementById("menu-btn");
    let mainNav = document.getElementById("mainNav");
    let menuOpen = false;

        menuBtn.addEventListener("click", () => {
        if(!menuOpen) {
            menuBtn.classList.add("open");
            mainNav.classList.add("show");
            menuOpen = true;
        } else {
            menuBtn.classList.remove("open");
            mainNav.classList.remove("show");
            menuOpen = false;
        }
    })
}

var IE = document.getElementById("IEbigText");
var notIE = document.getElementById("bigText");

window.onload = function() {
  if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
    notIE.style.display = "none";
    IE.style.display = "block";
  } else {
    notIE.style.display = "block";
    IE.style.display = "none";
  }
}