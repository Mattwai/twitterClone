console.log("hello world")

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/messages'

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    // wahen form submitted, grab content
    const name = formData.get('name');
    const content = formData.get('content');

    // store form content in an object
    const message = {
        name,
        content
    };
    form.style.display = 'none';
    loadingElement.style.display = '';

    // send data to backend
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers:{
            'content-type': 'application/json'
        }
    });
});