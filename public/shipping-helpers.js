const disableSection = (e) => {
    for(element of e.currentTarget.arrParam){
        if(!element.disabled){
            element.disabled = true;
            element.required = true;
        }
    }
}

const enableSection = (e) => {
    for(element of e.currentTarget.arrParam){
        if(element.disabled){
            element.disabled = false;
            element.required = false;
        }
    }
}

const createShipToSchool = document.getElementById('create-ship-to-school');
const createShipToHome = document.getElementById('create-ship-to-home');
const createAddressFields = document.getElementById('create-address-block').querySelectorAll('input');

createShipToSchool.arrParam = createAddressFields;
createShipToSchool.addEventListener('change', enableSection);
createShipToHome.arrParam = createAddressFields;
createShipToHome.addEventListener('change', disableSection);

const updateShipToSchool = document.getElementById('update-ship-to-school');
const updateShipToHome = document.getElementById('update-ship-to-home');
const updateAddressFields = document.getElementById('update-address-block').querySelectorAll('input');

updateShipToSchool.arrParam = updateAddressFields;
updateShipToSchool.addEventListener('change', enableSection);
updateShipToHome.arrParam = updateAddressFields;
updateShipToHome.addEventListener('change', disableSection);