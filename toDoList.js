//get elemet by id container
const container = document.getElementById('container');

// Array of objects to store the list 
const arrayOfListItems = JSON.parse(localStorage.getItem('list'));

// create the list
refreshDOM();

// gets input from the input box and store it in inputText
let inputText;
const inputBox = document.getElementById('input');
const innerText = inputBox.addEventListener('input', (event) => {
    inputText = event.target.value;
})

// update the localstorage
function updateLocalstorage() {
    //update the local storage
    localStorage.setItem('list', JSON.stringify(arrayOfListItems));

    // update the html
    refreshDOM(arrayOfListItems);
}


// modifies the inner html of container element
function refreshDOM() {

    // Array of objects to store the list 
    const itemslist = JSON.parse(localStorage.getItem('list'));

    // delete all the previous list items
    container.innerHTML = '';

    for (let list of itemslist) {

        // create checkbox element with class name list 
        const newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.checked = list.status;
        newInput.className = 'list';

        //create text node with input text as value
        const newItemText = document.createTextNode(list.text);

        // create a new div element
        const newItem = document.createElement('div');
        if(list.status){
            newItem.style.textDecoration = 'line-through';
        }

        // append checkbox to the div element
        newItem.append(newInput);

        //append text to the div element
        newItem.append(newItemText);

        // create delete button 
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'delete';

        // create outter div with class name items
        const div = document.createElement('div');
        div.className = 'items';

        // append new item to div
        div.append(newItem);
        div.append(deleteBtn);

        // append the new div to the existing container
        container.append(div);

    }
    //get element by class name
    document.querySelectorAll('.list').forEach(item => {
        item.addEventListener('click', toggleStatus);
    });

    //get elements by class name delete and iterate
    document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('click', deleteItem);
    });

    console.log(itemslist);
    // toggleStatus();
    // deleteItem();
}

// get element by id add-item
const submit = document.getElementById('add-item');

// add the item the list on enter
document.addEventListener('keyup', checkEnterPress);

// add item to the container on submit
submit.addEventListener('click', addItem);

// check if enter is pressed, if yes add item to list
function checkEnterPress(event) {
    // 13 is key code for enter
    if (event.keyCode === 13) {
        addItem();
    }
}

function addItem() {
    // check for inputText, if empty string throw an alert and print the message on console
    if (inputText) {
        // add object to the list
        arrayOfListItems.push({
            text: inputText,
            status: false,
        });

        //empty the inputText
        inputText = '';

        // empty the input element
        inputBox.value = '';

        updateLocalstorage();
    } else {
        alert('Input field is empty');
        console.log('Input field is empty');
    }
}

function toggleStatus() {
    // get index of element
    const index = returnIndex(event.srcElement.parentElement.parentElement);

    // modify the status of particular object based on index
    arrayOfListItems[index].status = event.srcElement.checked;

    updateLocalstorage();
}

function deleteItem() {
    // get the index of the element 
    const index = returnIndex(event.srcElement.parentElement);

    //remove the object from the array
    arrayOfListItems.splice(index, 1);

    updateLocalstorage();
}

// iterate through the container element and return the index of give inner element
function returnIndex(item) {
    // create the array of elements inside the conatiner 
    const items = container.children;
    for (let index in items) {
        if (items[index] === item) {
            return index;
        }
    }
}