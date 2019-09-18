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
    document.createElement('div')
    console.log("algo")
  }
})