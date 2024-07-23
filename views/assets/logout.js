const body = document.querySelector('body');
body.innerHTML += `
    <form id="logout-form" action="/login/logout" method="POST" hidden></form>
`;

const selectTitle = document.getElementById('title-combo');
if (selectTitle != null){
    selectTitle.addEventListener('change', function() {
        if (selectTitle.selectedIndex === 1) {
            const logoutForm = document.getElementById('logout-form');
            logoutForm.submit();
        }
    });
}