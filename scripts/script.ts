const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const projectsNav = document.querySelector("body nav + nav") as HTMLElement;

const burgerMenuButton = document.querySelector("body>div") as HTMLElement;
const navs = document.querySelectorAll("nav") as NodeListOf<HTMLElement>;
const main = document.querySelector("main") as HTMLElement;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

let projectList : Map<string, Map<string, Project>> = new Map();

enum CssClasses  {
  underlined = "underlined",
  isDisplayed = "isDisplayed",
  hidden = "hidden",
  visible = "visible"

}

interface Project{
  readonly title: string;
  readonly context: string;
  readonly details: string;
  readonly tools: string;
  readonly learned: string;
  readonly image : {
    readonly src: string;
    readonly alt: string;
    readonly title: string;
  }
}

init();

switch(activePage){
  case "Projects":
    buildProjects();
}

function hideNavs(){
  if(viewportHeight < 600 || viewportWidth < 1000)

    navs.forEach(nav=>{
      nav.classList.add(CssClasses.hidden) ;
      nav.classList.remove(CssClasses.visible);
    })
}

function displayNavs(){
  if(viewportHeight < 600 || viewportWidth < 1000)
    navs.forEach(nav=>{
      nav.classList.remove(CssClasses.hidden) ;
      nav.classList.add(CssClasses.visible);
    })
}

function onDetailsOpen(){
  if(this.open){
    document.querySelectorAll("details").forEach(d=>{
      if (this != d){
        d.open = false;
      }
    });
  }
};


function onResizeNavHidder(){
  if(viewportHeight < 600 || viewportWidth < 1000){
    navs.forEach(nav=>{
      nav.classList.remove(CssClasses.visible) ;
      nav.classList.add(CssClasses.hidden);
    })
  
  }else{
    navs.forEach(nav=>{
      nav.classList.remove(CssClasses.visible) ;
      nav.classList.remove(CssClasses.hidden);
    })
  }
}

function init(){
  document.getElementById(activePage)?.classList.add(CssClasses.underlined);

  window.addEventListener('resize', onResizeNavHidder);
  onResizeNavHidder();

  burgerMenuButton?.addEventListener("click",() => {

    if(navs[0].classList.contains(CssClasses.hidden)){
      displayNavs();
    } else{
      hideNavs();
    } 
  }
  );

}


function buildProjects(){

  loadProjects()
  .then((projects ) =>{

    Object.keys(projects).forEach((context)=>{
      let projectsMap : Map<string, Project> = new Map();

      projects[context].forEach((p : Project)=>{
        console.log(p)
        projectsMap.set(p.title, p);
      });

      projectList.set(context,projectsMap);
    })
  })
  .then(() => buildProjectNav());

}

function buildProjectNav(){
  projectList.forEach((projects, context)=>{
    let details = document.createElement("details");
    details.addEventListener("toggle", onDetailsOpen);
    let summary = document.createElement("summary");
    let ul = document.createElement("ul");

    summary.innerHTML = context;
    details.appendChild(summary);
    projects.forEach((project)=>{
      let li = document.createElement("li");
      li.innerHTML = project.title;
      li.addEventListener("click", buildProjectHTML);
      li.addEventListener("click", hideNavs);
      ul.appendChild(li);
    })

    details.appendChild(ul);

    projectsNav.appendChild(details)
  })

  buildProjectHTML(null, projectList.values().next().value.values().next().value);
  document.querySelectorAll("details")[0].open = true;
  document.querySelectorAll("summary")[0].classList.add(CssClasses.underlined);
  document.querySelectorAll("details li")[0].classList.add(CssClasses.underlined);
}


function buildProjectHTML(event, project: Project|null = null){

  main.innerHTML ="";
  let clickedProject: Project|undefined|null ;
  if(event != null){

    document.querySelectorAll("details li").forEach(s=>s.removeAttribute("class"));
    event.target.classList.add(CssClasses.underlined);
    document.querySelectorAll("summary").forEach(s=>s.removeAttribute("class"));
    event.target.parentNode.previousElementSibling.classList.add(CssClasses.underlined);

    
    let projectClickContext: string = event.target.parentNode.previousElementSibling.innerText;
    clickedProject= projectList.get(projectClickContext)?.get(event.target.innerText);
  }else{
    clickedProject = project;
  }

  let projectSection = createElement("section");
  appendChildren(projectSection, [
    createElement("h2", clickedProject?.title),
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

  appendChildren(main,[
    projectSection,
    appendChildren(createElement("figure"), [createElement("img", null, clickedProject?.image)])
  ])

}


async function loadProjects() : Promise<Map<string, Project[]>> {
  return fetch("/scripts/project.json")
  .then(response => response.json());
}


function createElement(elementTag: string, innerHTML: string|null = null, attributes: Object | null = null){
  let element = document.createElement(elementTag);

  if(innerHTML != null){
    element.innerHTML = innerHTML;
  }

  if(attributes != null){
    Object.keys(attributes).forEach((key) =>{
      element.setAttribute(key, attributes[key]);
    });
  }
  return element;
}

function appendChildren(element: HTMLElement, children: HTMLElement[]){
  children.forEach(child=>{
    element.appendChild(child);
  })
  return element;
}