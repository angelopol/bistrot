const sidebar = document.getElementById('sidebar');
if (sidebar != null){
    sidebar.addEventListener('click', function(e) {
        const target = e.target.closest('.side');
        if (!target) return;
    
        switch (target.classList[1]) {
            case 'inicio':
                window.location.href = '/login/home';
                break;
            case 'ventas':
                window.location.href = '/ventas/Vista_Gerente/gerente';
                break;
            case 'compras':
                window.location.href = '/compras-index';
                break;
            case 'rrhh':
                window.location.href = '/rrhh';
                break;
            case 'inventario':
                window.location.href = '/inventario';
                break;
            case 'mantent':
                window.location.href = '/mantenimientos';
                break;
            case 'cocina':
                window.location.href = '/cocina/produccion';
                break;
            case 'reserv':
                window.location.href = '/reservas';
                break;
            default:
                console.log('No matching class found for redirection');
        }
    });
}