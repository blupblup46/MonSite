let toast;
const fermer = document.getElementById("fermer")


fermer.addEventListener("click", function(){
    console.log("ferme")
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