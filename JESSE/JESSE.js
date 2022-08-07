const JESSE = document.getElementById("JESSE")
let index = 0;

let sons = new Array()
for (let x=0; x<10; x++){
  sons.push(new Audio("./JESSEsons/J"+x.toString()+".wav"))
}

JESSE.addEventListener("click", function(){
    console.log("J"+index.toString()+" est joué")
    sons[index].play()
    index+=1;
    index%=10;
})
