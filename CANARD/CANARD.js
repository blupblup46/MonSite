class Canard{
  constructor(){
    this.x = Math.floor(Math.random() * document.getElementById("fond").clientWidth)
    this.y = Math.floor(Math.random() * document.getElementById("fond").clientHeight)
    this.rotation = Math.floor(Math.random() * 360)
    this.fontSize = Math.floor(Math.random() * 5)
    this.couleur= "rgb("+ Math.floor(Math.random() * 255).toString()+" "+Math.floor(Math.random() * 255).toString()+" "+Math.floor(Math.random() * 255).toString()+")"
  }
}

const boutton = document.getElementById("boutton");
const fond = document.getElementById("CANARD");


boutton.addEventListener("click", function(){  
  const sonCanard = new Audio("./CANARD.mp3");
  let c = new Canard();

  nouvCanard = document.createElement("div")
  nouvCanard.innerText = "CANARD"
  nouvCanard.classList.add("canardMot")
  nouvCanard.style.right= c.x.toString()+"px";
  nouvCanard.style.top= c.y.toString()+"px";
  nouvCanard.style.fontSize = c.fontSize.toString()+"em";
  nouvCanard.style.color = c.couleur.toString()
  console.log(c.couleur.toString())
  sonCanard.play();
  fond.appendChild(nouvCanard);
  console.log("fait"+ c.x.toString()+"px" + c.y.toString()+"px")
})
