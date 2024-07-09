const navegar_contacto = document.getElementById('Page_contactos');
const navegar_personal = document.getElementById('Page_personal');
const navegar_reportes = document.getElementById('Page_reportes');

navegar_contacto.addEventListener('click',function(){
    window.location.href = 'Pagina_contacto.html';
})

navegar_personal.addEventListener('click',function(){
    window.location.href = 'Pagina_personal.html';
})

navegar_reportes.addEventListener('click',function(){
    window.location.href = 'Pagina_reportes.html';
})