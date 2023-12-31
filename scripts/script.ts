const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const details = document.querySelectorAll("details");
const burgerMenuButton = document.querySelector("body>div") as HTMLElement;
const nav = document.querySelector("body>nav") as HTMLElement;
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;


enum CssClasses  {
  underlined = "underlined",
  isDisplayed = "isDisplayed",
  hidden = "hidden",
  visible = "visible"

}

navHidder();
document.getElementById(activePage)?.classList.add(CssClasses.underlined);

details.forEach(d => d.addEventListener("toggle", onDetailsOpen));
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

function onDetailsOpen(){
  if(this.open){
    details.forEach(d=>{
      if (this != d){
        d.open = false;
      }
    });
  }
};

window.addEventListener('resize', navHidder);

function navHidder(){
  if(viewportHeight < 600 || viewportWidth < 1000){
    nav.classList.remove(CssClasses.visible) ;
    nav.classList.add(CssClasses.hidden);
  
  }else{
    nav.classList.add(CssClasses.visible) ;
    nav.classList.remove(CssClasses.hidden);
  }
}