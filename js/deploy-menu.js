// Elementos del NavBar
const boton = document.querySelector('#btn-menu-display');
const btnContact = document.querySelector('#btn-contact-deploy');
const menu = document.querySelector('.deploy-menu');
const contact = document.querySelector('.deploy-menu div:nth-child(2)');

// Funcion para desplegar el NavBar
boton.addEventListener('click', e =>{
    menu.classList.toggle('open');
})
btnContact.addEventListener('click', e =>{
    contact.classList.toggle('open');
})