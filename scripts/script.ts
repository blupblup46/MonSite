import { appendChildren, changeImage, createElement, createImgAsButton } from "./DOM.js";
import { ExperiencesLoader } from "./Experiences.js";
import type {Image, Project } from './utils.js';
import {CssClasses, Viewer } from './utils.js';

const viewportWidthLimit = 750;
const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const projectsNav = document.querySelector("body nav + nav") as HTMLElement;

const burgerMenuButton = document.querySelector("body>div") as HTMLElement;
const navs = document.querySelectorAll("nav") as NodeListOf<HTMLElement>;
const main = document.querySelector("main") as HTMLElement;


let projectList: Map<string, Map<string, Project>> = new Map();

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
    })
}

function displayNavs() {
  if (window.innerWidth < viewportWidthLimit)
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.hidden);
      nav.classList.add(CssClasses.visible);
    })
}

function onDetailsOpen(details: HTMLDetailsElement) {
  if (details.open) {
    document.querySelectorAll("details").forEach(d => {
      if (details != d) {
        d.open = false;
      }
    });
  }
};


function onResizeNavHidder() {
  if (window.innerWidth < viewportWidthLimit) {
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.visible);
      nav.classList.add(CssClasses.hidden);
    })

  } else {
    navs.forEach(nav => {
      nav.classList.add(CssClasses.visible);
      nav.classList.remove(CssClasses.hidden);
    })
  }
}

function init() {
  document.getElementById(activePage)?.classList.add(CssClasses.underlined);

  window.addEventListener('resize', onResizeNavHidder);
  onResizeNavHidder();

  burgerMenuButton?.addEventListener("click", () => {

    if (navs[0].classList.contains(CssClasses.hidden)) {
      displayNavs();
    } else {
      hideNavs();
    }
  }
  );

}


function buildProjects() {


  fetch("/ressources/project.json")
    .then(response => response.json())
    .then((_projects) => {

      Object.keys(_projects).forEach((context) => {
        let projectsMap: Map<string, Project> = new Map();

        _projects[context].forEach((p: Project) => {
          projectsMap.set(p.title, p);
        });

        projectList.set(context, projectsMap);
      })
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
      li.addEventListener("click", ()=>buildProjectHTML([li, summary]));
      li.addEventListener("click", hideNavs);
      ul.appendChild(li);
    });

    details.appendChild(ul);

    projectsNav.appendChild(details);
  });

  document.querySelectorAll("details")[0].open = true;
  (document.querySelector("details li") as HTMLElement).click();
}

function buildProjectHTML(elementsToUnderline: [HTMLLIElement, HTMLElement]) {


  imageIndexToDisplay = 0;
  main.innerHTML = "";

  document.querySelectorAll("details li").forEach(s => s.removeAttribute("class"));
  document.querySelectorAll("summary").forEach(s => s.removeAttribute("class"));
  elementsToUnderline.forEach(element => element.classList.add(CssClasses.underlined));
  elementsToUnderline[1]
  let projectClickContext: string = elementsToUnderline[1].innerHTML;
  let projects = projectList.get(projectClickContext);
  let clickedProject = projects?.get(elementsToUnderline[0].innerHTML);

  let projectSection = createElement("section");
  appendChildren(projectSection, [
    createElement("p", clickedProject?.context),
    createElement("p", clickedProject?.details),
    appendChildren(createElement("div"), [
      createElement("h3", "Outils"),
      createElement("p", clickedProject?.tools)
    ]),
    appendChildren(createElement("div"), [
      createElement("h3", "Acquis"),
      createElement("p", clickedProject?.learned)
    ]),

  ]);

  let image = clickedProject?.images[imageIndexToDisplay]
  let figureSelectorContainer = createElement("div", null, { class: "figures-container" });

  if(image != undefined){
    appendChildren(
      figureSelectorContainer,
      [createImgAsButton((e: MouseEvent) => changeImage(e, Viewer.previous, clickedProject?.images), { class: "image-button" }),
      appendChildren(
        createElement("figure"),
        [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]
      ),
      createImgAsButton((e: MouseEvent) => changeImage(e, Viewer.next, clickedProject?.images), { class: "image-button previousButton" })
      ]
    )
  }
 

  appendChildren(main, [
    createElement("h2", clickedProject?.title),
    appendChildren(
      createElement("div", null, { class: "project-container" }), [
      projectSection,
      figureSelectorContainer
    ]
    )
  ])

}
