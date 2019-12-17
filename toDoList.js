// gets input from the input box and store it in inputText
let inputText;
const inputBox = document.getElementById('input');
const innerText = inputBox.addEventListener('input', (event) => {
    inputText = event.target.value;
})

// add item to the container
const submit = document.getElementById('add-item');
const text = submit.addEventListener('click', () => {
    if (inputText){
    // get elemet by id container
    const container = document.getElementById('container');

    // create checkbox element with class name list 
    const newInput = document.createElement('input');
    newInput.type = 'checkbox';
    newInput.className = 'list';

    //create text node with input text as value
    var newItemText = document.createTextNode(inputText);
    
    // create a new div element with items class
    const newItem = document.createElement('div');
    newItem.className = 'items';

    // append checkbox to the div element
    newItem.append(newInput);

    //append text to the div element
    newItem.appendChild(newItemText);

    // append the new div to the existing container
    container.append(newItem);
    console.log(newItem);
    }else{
        alert('Input field is empty');
        console.log('Input field is empty');
    }
})

setInterval(() => {
document.querySelectorAll('.list').forEach(item => {
    item.addEventListener('click',() => {
        console.log(item.checked, item);
        item.parentNode.remove();
    })
})
},1000);
