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
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    let i = 0;

    for (let list of itemslist) {

        // create checkbox element with class name list 
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = list.status;
        input.className = 'list';

        input.addEventListener('click', toggleStatus);

        //create text node with input text as value
        const text = document.createTextNode(list.text);

        // create a new div element
        const innerDiv = document.createElement('div');
        if (list.status) {
            innerDiv.style.textDecoration = 'line-through';
        }

        // append checkbox to the div element
        innerDiv.append(input);

        //append text to the div element
        innerDiv.append(text);

        // create delete button 
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'delete';

        deleteBtn.addEventListener('click', deleteItem);

        // create outter div with class name box
        const outterDiv = document.createElement('div');
        outterDiv.className = 'box';
        outterDiv.setAttribute('position', i++);
        outterDiv.draggable = 'true';
        outterDiv.addEventListener('dragstart', dragStart);
        outterDiv.addEventListener('dragover', dragOver);
        outterDiv.addEventListener('dragend', dragEnd);

        // append new item to div
        outterDiv.append(innerDiv);
        outterDiv.append(deleteBtn);

        // append the new div to the existing container
        container.append(outterDiv);
    }
    console.log(itemslist);
}

// get element by id add-item
const submit = document.getElementById('add-item');

// add the item the list on enter
inputBox.addEventListener('keyup', checkEnterPress);

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
    const index = event.srcElement.parentElement.parentElement.getAttribute('position');
    // modify the status of particular object based on index
    arrayOfListItems[index].status = event.srcElement.checked;

    updateLocalstorage();
}

function deleteItem() {
    // get the index of the element 
    const index = event.srcElement.parentElement.getAttribute('position');

    //remove the object from the array
    arrayOfListItems.splice(index, 1);

    updateLocalstorage();
}

// drag functions
let dragStartPosition;
let dragEndPosition;
function dragStart() {
    dragStartPosition = event.srcElement.getAttribute('position');
}

function dragOver() {
    dragEndPosition = event.target.getAttribute('position');
}

function dragEnd() {
    const content = arrayOfListItems.splice(dragStartPosition, 1);
    arrayOfListItems.splice(dragEndPosition, 0, content[0]);
    updateLocalstorage();
}