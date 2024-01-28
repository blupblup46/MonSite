// import { ExperiencesLoader } from "./Experiences";
import Chart from '../node_modules/chart.js/auto'

console.log("ui")
const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

new Chart(
  document.getElementById('acquisitions') as HTMLCanvasElement,
  {
    type: 'bar',
    data: {
      labels: data.map(row => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map(row => row.count)
        }
      ]
    }
  }
);

const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const projectsNav = document.querySelector("body nav + nav") as HTMLElement;

const burgerMenuButton = document.querySelector("body>div") as HTMLElement;
const navs = document.querySelectorAll("nav") as NodeListOf<HTMLElement>;
const main = document.querySelector("main") as HTMLElement;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

let projectList: Map<string, Map<string, Project>> = new Map();

let imageIndexToDisplay = 0;

enum CssClasses {
  underlined = "underlined",
  isDisplayed = "isDisplayed",
  hidden = "hidden",
  visible = "visible",
}

enum ImageViewer {
  previous = -1,
  next = +1
}

interface Project {
  readonly title: string;
  readonly context: string;
  readonly details: string;
  readonly tools: string;
  readonly learned: string;
  readonly images: Image[]
}

interface Image {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
}

init();

switch (activePage) {
  case "Projects":
    buildProjects();
    break;
  case "Experiences":
    // new ExperiencesLoader();
}

function hideNavs() {
  if (viewportHeight < 600 || viewportWidth < 1000)

    navs.forEach(nav => {
      nav.classList.add(CssClasses.hidden);
      nav.classList.remove(CssClasses.visible);
    })
}

function displayNavs() {
  if (viewportHeight < 600 || viewportWidth < 1000)
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
  if (viewportHeight < 600 || viewportWidth < 1000) {
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.visible);
      nav.classList.add(CssClasses.hidden);
    })

  } else {
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.visible);
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

  fetch("/scripts/project.json")
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
  console.log(elementsToUnderline)

  imageIndexToDisplay = 0;
  main.innerHTML = "";

  document.querySelectorAll("details li").forEach(s => s.removeAttribute("class"));
  document.querySelectorAll("summary").forEach(s => s.removeAttribute("class"));
  elementsToUnderline.forEach(element => element.classList.add(CssClasses.underlined));
  elementsToUnderline[1]
  let projectClickContext: string = elementsToUnderline[1].innerHTML;
  let projects = projectList.get(projectClickContext);
  let clickedProject = projects?.get(elementsToUnderline[0].innerHTML);
  console.log(clickedProject)
  console.log(elementsToUnderline[1].innerText)
  console.log(elementsToUnderline[0].innerText)

  console.log(projectList)


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
      [createImgAsButton((e: MouseEvent) => changeImage(e, ImageViewer.previous, clickedProject?.images), { class: "image-button" }),
      appendChildren(
        createElement("figure"),
        [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]
      ),
      createImgAsButton((e: MouseEvent) => changeImage(e, ImageViewer.next, clickedProject?.images), { class: "image-button previousButton" })
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

function changeImage(e: MouseEvent, view: ImageViewer, images: Image[]|null|undefined) {
  imageIndexToDisplay += view;

  if(images != undefined){
    if (imageIndexToDisplay < 0 && images) {
      imageIndexToDisplay = images.length - 1
    } else if (imageIndexToDisplay > images.length - 1) {
      imageIndexToDisplay = 0;
    }
  
    let figure = (e.target as HTMLElement).parentElement?.querySelector("figure") as HTMLElement;
  
    let img = figure.querySelector("img") as HTMLImageElement;
  
    figure.removeChild(img);
  
    img.src = images[imageIndexToDisplay].src;
    img.alt = images[imageIndexToDisplay].alt;
    img.title = images[imageIndexToDisplay].title;
  
    figure.appendChild(img);
  }
}


async function loadProjects(): Promise<Map<string, Project[]>> {
  return fetch("/scripts/project.json")
    .then(response => response.json());
}


function createElement(elementTag: string, innerHTML: string | null = null, attributes: Record<string, string> | null = null): HTMLElement {
  let element = document.createElement(elementTag);

  if (innerHTML != null) {
    element.innerHTML = innerHTML;
  }

  if (attributes != null) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }
  return element;
}

function appendChildren(element: HTMLElement, children: HTMLElement[]): HTMLElement {
  children.forEach(child => {
    element.appendChild(child);
  })
  return element;
}


function createImgAsButton(callBack: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, attributes: Record<string, string> | null = null, src: string = "/images/chevron.png") {

  let button = createElement("img", null, { src })

  if (attributes != null) {
    Object.keys(attributes).forEach((key) => {
      button.setAttribute(key, attributes[key]);
    });
  }

  button.onclick = callBack;

  return button;
}


