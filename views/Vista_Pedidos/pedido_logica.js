const abrir_modal = document.querySelector("#button-abrir-modal");
const cerrar_modal = document.querySelector("#button-cerrar-modal");
const modal = document.querySelector("#modal");  

abrir_modal.addEventListener("click",()=>{
    modal.showModal();
})

cerrar_modal.addEventListener("click",()=>{
    modal.close()
})