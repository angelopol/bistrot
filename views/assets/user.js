fetch('/rrhh/usuario')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const selectTitle = document.getElementById('title-combo');
    if (selectTitle != null) {
        if (selectTitle && selectTitle.options && selectTitle.options.length > 0) {
            selectTitle.options[0].text = data.user;
        }
    }
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});