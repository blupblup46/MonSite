let toast;
const fermer = document.getElementsByClassName("fermer")


fermer[0].addEventListener("click", function(){
  toast.hide()

})

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}

fetch("./projects.json").then((response)=>response.json()).then(res=>generateProjects(res.projects))
const projectsCarousel = document.getElementById('projectsCarousel')

function generateProjects(projects){
  projectsCarousel.innerHTML = []
  let activeClass = "active"
  for(let project of projects){
    let carouselItem = createElement("div", null, "carousel-item", activeClass);
    activeClass = null;
    let learnedDiv = createElement("div", null, null);
    let toolsDiv = createElement("div", null, null);
    let section = createElement("section",  null, null);
    let figure = createElement("figure", null, null);

    toolsDiv.append(
      createElement("h3", "Outils"),
      createElement("p", project.tools)
    )

    learnedDiv.append(
      createElement("h3", "Acquis"),
      createElement("p", project.learned)
    )
    figure.append(
      createElementImage(project.image)
    )
    section.append(

      createElement("h2", project.title),
      createElement("p", project.context),
      createElement("p", project.details),
      toolsDiv,
      learnedDiv,

    )

    carouselItem.append(
      section,
      figure
    )
    console.log(carouselItem)
    projectsCarousel.appendChild(
      carouselItem
      
    )

  }
}

function createElementImage(attributes){
  const img = document.createElement("img");
  for(let [key, value] of Object.entries(attributes)){
    img.setAttribute(key, value)
  }
  return img;
}

function createElement(type, innerHTML, ...classes){
  const element = document.createElement(type);
  element.innerHTML = innerHTML;
  if(classes.length != 0){
    for(let classAttr of classes){
      element.classList.add(classAttr);
    }
  }
  
  return element;
}