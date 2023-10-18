let toast;
const fermer = document.getElementsByClassName("fermer")


fermer[0].addEventListener("click", function(){
  console.log("ferme")
  toast.hide()

})

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    toast = new bootstrap.Toast(toastLiveExample)
    console.log("ui")
    toast.show()
  })
}

fetch('./test.json')
    .then((response) => response.json())
    .then((json) => console.log(json));