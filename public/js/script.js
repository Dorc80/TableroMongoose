let  eliminarArray = document.querySelectorAll('.eliminar');

let eliminarForm = document.querySelector('#eliminarForm');

for(var i = 0; i < eliminarArray.length; i++) {

    eliminarArray[i].addEventListener('click', function() {
        eliminarForm.action = '/leones/destruir/' + this.id;
        eliminarForm.submit();
    });
    
}