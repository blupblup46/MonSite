const JESSE = document.getElementById("JESSE")
let index = 0;

let sons = new Array()
for (let x=1; x<9; x++){
  sons.push(new Audio("./JESSEsons/J"+x.toString()+".wav"))
}

JESSE.addEventListener("click", function(){
    console.log(index)
    sons[index].play()
    index+=1;
    index%=8;
})