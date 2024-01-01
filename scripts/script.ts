const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const details = document.querySelectorAll("details");
const projectsNav = document.querySelector("nav:nth-child(2)") as HTMLElement;

const burgerMenuButton = document.querySelector("body>div") as HTMLElement;
const nav = document.querySelector("body>nav") as HTMLElement;
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



function onDetailsOpen(){
  if(this.open){
    details.forEach(d=>{
      if (this != d){
        d.open = false;
      }
    });
  }
};


function navHidder(){
  if(viewportHeight < 600 || viewportWidth < 1000){
    nav.classList.remove(CssClasses.visible) ;
    nav.classList.add(CssClasses.hidden);
  
  }else{
    nav.classList.remove(CssClasses.visible) ;
    nav.classList.remove(CssClasses.hidden);
  }
}

function init(){
  document.getElementById(activePage)?.classList.add(CssClasses.underlined);

  window.addEventListener('resize', navHidder);
  navHidder();

  burgerMenuButton?.addEventListener("click",() => {
    console.log("click");
    if(nav.classList.contains(CssClasses.hidden)){
      nav.classList.remove(CssClasses.hidden);
      nav.classList.add(CssClasses.visible);
    } else{
      nav.classList.remove(CssClasses.visible);
      nav.classList.add(CssClasses.hidden);
    } 
  
  }
  );

}


function buildProjects(){
  details.forEach(d => d.addEventListener("toggle", onDetailsOpen));

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
    let summary = document.createElement("summary");
    let ul = document.createElement("ul");

    summary.innerText = context;
    details.appendChild(summary);
    projects.forEach((project)=>{
      let li = document.createElement("li");
      li.innerText = project.title;
      li.addEventListener("click", buildProject);
      ul.appendChild(li);
    })

    details.appendChild(ul);

    projectsNav.appendChild(details)
  })

}

function buildProject(event){

  let projectClickContext: string = event.target.parentNode.previousElementSibling.innerText;
  let project: Project|undefined = projectList.get(projectClickContext)?.get(event.target.innerText);
  
}


async function loadProjects() : Promise<Map<string, Project[]>> {
  return fetch("/scripts/project.json")
  .then(response => response.json());
}