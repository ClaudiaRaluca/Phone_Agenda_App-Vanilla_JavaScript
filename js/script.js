/* GLOBAL */
var CONTACT_LIST_CONTAINER = document.getElementById("app-body");
var addBtn = document.getElementById('add');
var delBtn = document.getElementById('del');
var CONTACT_LIST_ITEMS, SELECTED_ITEM;

/* Checking local storage for data */
window.onload = function checkLocalStorage() {
    var localStorageData = localStorage.getItem('current-list');
    if (localStorageData != '') {
        CONTACT_LIST_CONTAINER.innerHTML = localStorageData;
        selectElement();
        selectOneElement();
        deleteContact();
        mainFunction();
    } else {
        mainFunction();
    }
}

/* Function for selecting items */
function selectElement() {
    CONTACT_LIST_ITEMS = document.getElementsByClassName("contact");
    if (CONTACT_LIST_ITEMS.length == 1) {
        CONTACT_LIST_ITEMS[0].onclick = function () {
            CONTACT_LIST_ITEMS[0].classList.add('selected-contact');
            SELECTED_ITEM = CONTACT_LIST_ITEMS[0].id;
            deleteContact();
        }
    } else if (CONTACT_LIST_ITEMS.length > 1) {
        for (let i = 0; i < CONTACT_LIST_ITEMS.length; i++) {
            CONTACT_LIST_ITEMS[i].onclick = function () {
                SELECTED_ITEM = CONTACT_LIST_ITEMS[i].id;
                CONTACT_LIST_ITEMS[i].classList.add('selected-contact');
                selectOneElement();
            }
        }
    }
}

/* Function for selecting 1 item at a time */
function selectOneElement() {
    CONTACT_LIST_ITEMS = document.getElementsByClassName("contact");
    for (let j = 0; j < CONTACT_LIST_ITEMS.length; j++) {
        if (CONTACT_LIST_ITEMS[j].id != SELECTED_ITEM) {
            CONTACT_LIST_ITEMS[j].classList.remove('selected-contact');
            deleteContact();
        }
    }
}

/* Function for deleting items */
function deleteContact() {
    delBtn.onclick = () => {
        CONTACT_LIST_ITEMS = document.getElementsByClassName("contact");
        var item = document.getElementById(SELECTED_ITEM);
        if (CONTACT_LIST_ITEMS.length == 1) {
            CONTACT_LIST_CONTAINER.innerHTML = '';
        } else if (CONTACT_LIST_ITEMS.length > 1) {
            CONTACT_LIST_CONTAINER.removeChild(item);
        }
        selectElement();
        saveToLocalStorage();
    }
}

function mainFunction() {

    /* Function for displaying item adding window */
    addBtn.onclick = function displayAddCont() {
        document.getElementById('add-container-none').id = 'add-container';
        CONTACT_LIST_CONTAINER.classList.remove('active');
        CONTACT_LIST_CONTAINER.style.opacity = "50%";
    }

    /* Function for closing item adding window */
    var closeBtn = document.getElementById('close');
    closeBtn.onclick = function closeAddCont() {
        document.getElementById('add-container').id = 'add-container-none';
        document.getElementById('name').value = '';
        document.getElementById('tel').value = '';
        CONTACT_LIST_CONTAINER.classList.add('active');
        CONTACT_LIST_CONTAINER.style.opacity = "100%";
    }

    /* Functions for adding items */
    var addContactStage = document.getElementById('add-contact');
    addContactStage.onclick = function addContact() {
        var name = document.getElementById('name');
        var tel = document.getElementById('tel');

        if (name.value !== '' && /^\d+$/.test(tel.value) == true) {
            CONTACT_LIST_CONTAINER.innerHTML += '<div class="contact" id="' + Math.random().toString(30).substring(7) + '"><div><span class="contactName"><b>'
                + name.value + '</b></span></div><div><span class="contactPhoneN">' + tel.value + '</span></div><div>';
            saveToLocalStorage();
            document.getElementById('add-container').id = 'add-container-none';
            CONTACT_LIST_CONTAINER.classList.add("active");
            CONTACT_LIST_CONTAINER.style.opacity = "100%";
            name.value = '';
            tel.value = '';

            selectElement();
            selectOneElement();
            deleteContact();
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem('current-list', CONTACT_LIST_CONTAINER.innerHTML);
}