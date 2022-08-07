const JESSE = document.getElementById("JESSE")
let sons = new Array()
for (let x=0; x<10; x++){
  sons.push(new Audio("./JESSEsons/J"+x.toString()+".wav"))
}

JESSE.addEventListener("click", function(){
    let index = Math.floor(Math.random() * 9)
    console.log("J"+index.toString()+" est joué")
    sons[index].play()
})
