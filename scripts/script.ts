const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const details = document.querySelectorAll("details");
enum CssClasses  {
  underlined = "underlined"
}

document.getElementById(activePage)?.classList.add(CssClasses.underlined);

details.forEach(d => d.addEventListener("toggle", onDetailsOpen));


function onDetailsOpen(){
  if(this.open){
    details.forEach(d=>{
      if (this != d){
        d.open = false;
      }
    });
  }
};