console.log('Global Helpers Working')

const createDateValidation = () => {
    const   createOpenDate = parseInt(document.getElementById("create-website-open-date").value.replaceAll('-','')),
            createCloseDate = parseInt(document.getElementById("create-website-close-date").value.replaceAll('-','')),
            createCeremonyDate = parseInt(document.getElementById("create-ceremony-date").value.replaceAll('-',''));
    
    if(createCloseDate < createOpenDate){
        alert('Website close date must be after open date!');
        return false;
    }

    if(createCloseDate > createCeremonyDate){
        alert('Website ceremony cannot be before the website close date');
        return false;
    }

    return true
}

const updateDateValidation = () => {
    const   updateOpenDate = parseInt(document.getElementById("update-website-open-date").value.replaceAll('-','')),
            updateCloseDate = parseInt(document.getElementById("update-website-close-date").value.replaceAll('-','')),
            updateCeremonyDate = parseInt(document.getElementById("update-ceremony-date").value.replaceAll('-',''));
    
    if(updateCloseDate < updateOpenDate){
        alert('Website close date must be after open date!');
        return false;
    }

    if(updateCloseDate > updateCeremonyDate){
        alert('Website ceremony cannot be before the website close date');
        return false;
    }

    return true
}



