import { appendChildren, changeImage, createElement, createImgAsButton } from "./DOM.js";
import { ExperiencesLoader } from "./Experiences.js";
import { CssClasses, Viewer } from './utils.js';
const viewportWidthLimit = 750;
const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage");
const projectsNav = document.querySelector("body nav + nav");
const burgerMenuButton = document.querySelector("body>div");
const navs = document.querySelectorAll("nav");
const main = document.querySelector("main");
let projectList = new Map();
let imageIndexToDisplay = 0;
init();
hideNavs();
switch (activePage) {
    case "Projects":
        buildProjects();
        break;
    case "Experiences":
        new ExperiencesLoader();
    default:
        break;
}
function hideNavs() {
    if (window.innerWidth < viewportWidthLimit)
        navs.forEach(nav => {
            nav.classList.add(CssClasses.hidden);
            nav.classList.remove(CssClasses.visible);
        });
}
function displayNavs() {
    if (window.innerWidth < viewportWidthLimit)
        navs.forEach(nav => {
            nav.classList.remove(CssClasses.hidden);
            nav.classList.add(CssClasses.visible);
        });
}
function onDetailsOpen(details) {
    if (details.open) {
        document.querySelectorAll("details").forEach(d => {
            if (details != d) {
                d.open = false;
            }
        });
    }
}
;
function onResizeNavHidder() {
    if (window.innerWidth < viewportWidthLimit) {
        navs.forEach(nav => {
            nav.classList.remove(CssClasses.visible);
            nav.classList.add(CssClasses.hidden);
        });
    }
    else {
        navs.forEach(nav => {
            nav.classList.add(CssClasses.visible);
            nav.classList.remove(CssClasses.hidden);
        });
    }
}
function init() {
    var _a;
    (_a = document.getElementById(activePage)) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.underlined);
    window.addEventListener('resize', onResizeNavHidder);
    onResizeNavHidder();
    burgerMenuButton === null || burgerMenuButton === void 0 ? void 0 : burgerMenuButton.addEventListener("click", () => {
        if (navs[0].classList.contains(CssClasses.hidden)) {
            displayNavs();
        }
        else {
            hideNavs();
        }
    });
}
function buildProjects() {
    fetch("/ressources/project.json")
        .then(response => response.json())
        .then((_projects) => {
        Object.keys(_projects).forEach((context) => {
            let projectsMap = new Map();
            _projects[context].forEach((p) => {
                projectsMap.set(p.title, p);
            });
            projectList.set(context, projectsMap);
        });
    })
        .then(() => buildProjectNav());
}
function buildProjectNav() {
    projectList.forEach((projects, context) => {
        let details = document.createElement("details");
        details.addEventListener("toggle", () => onDetailsOpen(details));
        let summary = document.createElement("summary");
        let ul = document.createElement("ul");
        summary.innerHTML = context;
        details.appendChild(summary);
        projects.forEach((project) => {
            let li = document.createElement("li");
            li.innerHTML = project.title;
            li.addEventListener("click", () => buildProjectHTML([li, summary]));
            li.addEventListener("click", hideNavs);
            ul.appendChild(li);
        });
        details.appendChild(ul);
        projectsNav.appendChild(details);
    });
    document.querySelectorAll("details")[0].open = true;
    document.querySelector("details li").click();
}
function buildProjectHTML(elementsToUnderline) {
    imageIndexToDisplay = 0;
    main.innerHTML = "";
    document.querySelectorAll("details li").forEach(s => s.removeAttribute("class"));
    document.querySelectorAll("summary").forEach(s => s.removeAttribute("class"));
    elementsToUnderline.forEach(element => element.classList.add(CssClasses.underlined));
    elementsToUnderline[1];
    let projectClickContext = elementsToUnderline[1].innerHTML;
    let projects = projectList.get(projectClickContext);
    let clickedProject = projects === null || projects === void 0 ? void 0 : projects.get(elementsToUnderline[0].innerHTML);
    let projectSection = createElement("section");
    appendChildren(projectSection, [
        createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.context),
        createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.details),
        appendChildren(createElement("div"), [
            createElement("h3", "Outils"),
            createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.tools)
        ]),
        appendChildren(createElement("div"), [
            createElement("h3", "Acquis"),
            createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.learned)
        ]),
    ]);
    let image = clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.images[imageIndexToDisplay];
    let figureSelectorContainer = createElement("div", null, { class: "figures-container" });
    if (image != undefined) {
        appendChildren(figureSelectorContainer, [createImgAsButton((e) => changeImage(e, Viewer.previous, clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.images), { class: "image-button" }),
            appendChildren(createElement("figure"), [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]),
            createImgAsButton((e) => changeImage(e, Viewer.next, clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.images), { class: "image-button previousButton" })
        ]);
    }
    appendChildren(main, [
        createElement("h2", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.title),
        appendChildren(createElement("div", null, { class: "project-container" }), [
            projectSection,
            figureSelectorContainer
        ])
    ]);
}
