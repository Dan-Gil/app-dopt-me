const isRefugee = document.querySelector('#refugee')

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

$(function () {
  checkLogin("#login");
});

//validaciones
var emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";

function checkInput(idInput, pattern) {
  return $(idInput).val().match(pattern) ? true : false;
}

function checkLongInput(idInput) {
  return $(idInput).val().length >= 2 ? true : false;
}

function enableSubmit(idForm) {
  $(idForm + " input.submit").removeAttr("disabled");
}

function disableSubmit(idForm) {
  $(idForm + " input.submit").attr("disabled", "disabled");
}

function checkLogin(idForm) {
  $(idForm + " *").on("change keydown", function () {
    if (checkInput("#email", emailPattern) &&
      checkLongInput("#password")) {
      enableSubmit(idForm);
    } else {
      disableSubmit(idForm);
    }
  });
}

isRefugee.addEventListener('change', e => {
  if (isRefugee.checked) {
    // Refugee's name
    const formGroupRN = document.createElement('div')
    formGroupRN.setAttribute('class', 'form-group input-group')
    formGroupRN.setAttribute('id', 'rn')
    const inputGroupRN = document.createElement('div')
    inputGroupRN.setAttribute('class', 'input-group-prepend')
    const inputGroupTextRN = document.createElement('span')
    inputGroupTextRN.setAttribute('class', 'input-group-text plr-15')
    const iconRN = document.createElement('i')
    iconRN.setAttribute('class', 'fa fa-paw')
    const inputFormControlRN = document.createElement('input')
    inputFormControlRN.setAttribute('class', 'form-control')
    inputFormControlRN.setAttribute('placeholder', 'Nombre del refugio')
    inputFormControlRN.setAttribute('name', 'refugeeName')
    inputFormControlRN.setAttribute('type', 'text')
    inputGroupTextRN.appendChild(iconRN)
    inputGroupRN.appendChild(inputGroupTextRN)
    formGroupRN.appendChild(inputGroupRN)
    formGroupRN.appendChild(inputFormControlRN)
    const preLastElementRN = document.querySelector('#signup').childNodes[document.querySelector('#signup').childNodes.length - 6]
    document.querySelector('#signup').insertBefore(formGroupRN, preLastElementRN)

    // Refugee'Street
    const formGroupRS = document.createElement('div')
    formGroupRS.setAttribute('class', 'form-group input-group')
    formGroupRS.setAttribute('id', 'rs')
    const inputGroupRS = document.createElement('div')
    inputGroupRS.setAttribute('class', 'input-group-prepend')
    const inputGroupTextRS = document.createElement('span')
    inputGroupTextRS.setAttribute('class', 'input-group-text plr-15')
    const iconRS = document.createElement('i')
    iconRS.setAttribute('class', 'fa fa-address-book')
    const inputFormControlRS = document.createElement('input')
    inputFormControlRS.setAttribute('class', 'form-control')
    inputFormControlRS.setAttribute('placeholder', 'Calle')
    inputFormControlRS.setAttribute('name', 'refugeeStreet')
    inputFormControlRS.setAttribute('type', 'text')
    inputGroupTextRS.appendChild(iconRS)
    inputGroupRS.appendChild(inputGroupTextRS)
    formGroupRS.appendChild(inputGroupRS)
    formGroupRS.appendChild(inputFormControlRS)
    const preLastElementRS = document.querySelector('#signup').childNodes[document.querySelector('#signup').childNodes.length - 6]
    document.querySelector('#signup').insertBefore(formGroupRS, preLastElementRS)

    // Refugee's Street Number
    const formGroupRSN = document.createElement('div')
    formGroupRSN.setAttribute('class', 'form-group input-group')
    formGroupRSN.setAttribute('id', 'rsn')
    const inputGroupRSN = document.createElement('div')
    inputGroupRSN.setAttribute('class', 'input-group-prepend')
    const inputGroupTextRSN = document.createElement('span')
    inputGroupTextRSN.setAttribute('class', 'input-group-text plr-15')
    const iconRSN = document.createElement('i')
    iconRSN.setAttribute('class', 'fa fa-address-book')
    const inputFormControlRSN = document.createElement('input')
    inputFormControlRSN.setAttribute('class', 'form-control')
    inputFormControlRSN.setAttribute('placeholder', 'Número')
    inputFormControlRSN.setAttribute('name', 'refugeeStreetNumber')
    inputFormControlRSN.setAttribute('type', 'text')
    inputGroupTextRSN.appendChild(iconRSN)
    inputGroupRSN.appendChild(inputGroupTextRSN)
    formGroupRSN.appendChild(inputGroupRSN)
    formGroupRSN.appendChild(inputFormControlRSN)
    const preLastElementRSN = document.querySelector('#signup').childNodes[document.querySelector('#signup').childNodes.length - 6]
    document.querySelector('#signup').insertBefore(formGroupRSN, preLastElementRSN)

    // Refugee's suburb
    const formGroupRC = document.createElement('div')
    formGroupRC.setAttribute('class', 'form-group input-group')
    formGroupRC.setAttribute('id', 'rc')
    const inputGroupRC = document.createElement('div')
    inputGroupRC.setAttribute('class', 'input-group-prepend')
    const inputGroupTextRC = document.createElement('span')
    inputGroupTextRC.setAttribute('class', 'input-group-text plr-15')
    const iconRC = document.createElement('i')
    iconRC.setAttribute('class', 'fa fa-address-book')
    const inputFormControlRC = document.createElement('input')
    inputFormControlRC.setAttribute('class', 'form-control')
    inputFormControlRC.setAttribute('placeholder', 'Colonia')
    inputFormControlRC.setAttribute('name', 'refugeeSuburb')
    inputFormControlRC.setAttribute('type', 'text')
    inputGroupTextRC.appendChild(iconRC)
    inputGroupRC.appendChild(inputGroupTextRC)
    formGroupRC.appendChild(inputGroupRC)
    formGroupRC.appendChild(inputFormControlRC)
    const preLastElementRC = document.querySelector('#signup').childNodes[document.querySelector('#signup').childNodes.length - 6]
    document.querySelector('#signup').insertBefore(formGroupRC, preLastElementRC)

    // Refugee's City
    const formGroupRCT = document.createElement('div')
    formGroupRCT.setAttribute('class', 'form-group input-group')
    formGroupRCT.setAttribute('id', 'rct')
    const inputGroupRCT = document.createElement('div')
    inputGroupRCT.setAttribute('class', 'input-group-prepend')
    const inputGroupTextRCT = document.createElement('span')
    inputGroupTextRCT.setAttribute('class', 'input-group-text plr-15')
    const iconRCT = document.createElement('i')
    iconRCT.setAttribute('class', 'fa fa-address-book')
    const inputFormControlRCT = document.createElement('input')
    inputFormControlRCT.setAttribute('class', 'form-control')
    inputFormControlRCT.setAttribute('placeholder', 'Ciudad')
    inputFormControlRCT.setAttribute('name', 'refugeeCity')
    inputFormControlRCT.setAttribute('type', 'text')
    inputGroupTextRCT.appendChild(iconRCT)
    inputGroupRCT.appendChild(inputGroupTextRCT)
    formGroupRCT.appendChild(inputGroupRCT)
    formGroupRCT.appendChild(inputFormControlRCT)
    const preLastElementRCT = document.querySelector('#signup').childNodes[document.querySelector('#signup').childNodes.length - 6]
    document.querySelector('#signup').insertBefore(formGroupRCT, preLastElementRCT)

    // Refugee's Country
    const formGroupRCntry = document.createElement('div')
    formGroupRCntry.setAttribute('class', 'form-group input-group')
    formGroupRCntry.setAttribute('id', 'rcntry')
    const inputGroupRCntry = document.createElement('div')
    inputGroupRCntry.setAttribute('class', 'input-group-prepend')
    const inputGroupTextRCntry = document.createElement('span')
    inputGroupTextRCntry.setAttribute('class', 'input-group-text plr-15')
    const iconRCntry = document.createElement('i')
    iconRCntry.setAttribute('class', 'fa fa-address-book')
    const inputFormControlRCntry = document.createElement('input')
    inputFormControlRCntry.setAttribute('class', 'form-control')
    inputFormControlRCntry.setAttribute('placeholder', 'País')
    inputFormControlRCntry.setAttribute('name', 'refugeeCountry')
    inputFormControlRCntry.setAttribute('type', 'text')
    inputGroupTextRCntry.appendChild(iconRCntry)
    inputGroupRCntry.appendChild(inputGroupTextRCntry)
    formGroupRCntry.appendChild(inputGroupRCntry)
    formGroupRCntry.appendChild(inputFormControlRCntry)
    const preLastElementRCntry = document.querySelector('#signup').childNodes[document.querySelector('#signup').childNodes.length - 6]
    document.querySelector('#signup').insertBefore(formGroupRCntry, preLastElementRCntry)
  } else {
    const name = document.querySelector('#rn')
    const street = document.querySelector('#rs')
    const number = document.querySelector('#rsn')
    const col = document.querySelector('#rc')
    const city = document.querySelector('#rct')
    const country = document.querySelector('#rcntry')
    const form = document.querySelector('#signup')
    form.removeChild(name)
    form.removeChild(street)
    form.removeChild(number)
    form.removeChild(col)
    form.removeChild(city)
    form.removeChild(country)

  }
})