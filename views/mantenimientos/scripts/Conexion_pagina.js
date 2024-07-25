const navegar_contacto = document.getElementById('Page_contactos');
const navegar_reportes = document.getElementById('Page_reportes');
const navegar_mantenimiento = document.getElementById('Page_mantenimientos');

navegar_contacto.addEventListener('click',function(){
    window.location.href = './Pagina_contacto.ejs';
})

navegar_reportes.addEventListener('click',function(){
    window.location.href = 'mantenimientos/Pagina_reportes.ejs';
})

navegar_mantenimiento.addEventListener('click',function(){
    window.location.href = 'agregar';
})