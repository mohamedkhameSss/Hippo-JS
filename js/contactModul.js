export class Contact {
  constructor() {
    this.nameInput = document.getElementById("nameInput");
    this.emailInput = document.getElementById("emailInput");
    this.phoneInput = document.getElementById("phoneInput");
    this.ageInput = document.getElementById("ageInput");
    this.passwInput = document.getElementById("passwInput");
    this.rePassInput = document.getElementById("rePassInput");
    this.alertpass = document.getElementById("alertpass");
    this.alertEmail = document.getElementById("alertEmail");
    this.subBtn = document.getElementById("subBtn");
    this.alertAge = document.getElementById("alertAge");
    this.alertrepass = document.getElementById("alertrepass");
    this.alertname = document.getElementById("alertname");
    $("#conLink").click(function () {
      $(".CategorySection").addClass("d-none");
      $(".IngreSection").addClass("d-none");
      $(".areaSection").addClass("d-none");
      $(".search").addClass("d-none");

      $(".mainSection").addClass("d-none");
      $(".detailes").addClass("d-none");
      $(".contactSection").removeClass("d-none");
    });
    this.passValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    this.emailValid =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.phValid =
      /[\+\(]{0,2}\d{1,4}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}/;
    this.namval = /^((?:(?:[a-zA-Z]+)(?:-(?:[a-zA-Z]+))+)|(?:[a-zA-Z]+))$/;

    this.emailInput.addEventListener("keyup", () => {
      this.validEmail();
    });
    this.passwInput.addEventListener("keyup", () => {
      this.valiPass();
    });
    this.rePassInput.addEventListener("keyup", () => {
      this.valiRePass();

      this.buttonDisabled();
    });
    this.ageInput.addEventListener("keyup", () => {
      this.minAge();
    });
    this.phoneInput.addEventListener("keyup", () => {
      this.valPhone();
    });
  }
  buttonDisabled() {
    this.alertpass.classList.contains("d-none") &&
    this.alertEmail.classList.contains("d-none") &&
    this.alertAge.classList.contains("d-none") &&
    this.alertrepass.classList.contains("d-none") &&
    this.alertname.classList.contains("d-none")
      ? this.subBtn.removeAttribute("disabled")
      : (this.subBtn.disabled = "true");
  }

  validEmail() {
    if (
      !this.emailValid.test(this.emailInput.value) ||
      this.emailInput.value == ""
    ) {
      this.alertEmail.classList.remove("d-none");
    } else {
      this.alertEmail.classList.add("d-none");
    }
  }
  valiPass() {
    if (
      !this.passValid.test(this.passwInput.value) ||
      this.passwInput.value == ""
    ) {
      this.alertpass.classList.remove("d-none");
    } else {
      this.alertpass.classList.add("d-none");
    }
  }
  valiRePass() {
    if (this.rePassInput.value === this.passwInput.value) {
      $("#alertrepass").addClass("d-none");
    } else {
      $("#alertrepass").removeClass("d-none");
    }
  }
  minAge() {
    if (this.ageInput.value >= 12 || this.ageInput.value === "") {
      $("#alertAge").addClass("d-none");
    } else {
      $("#alertAge").removeClass("d-none");
    }
  }
  valPhone() {
    if (
      !this.phValid.test(this.phoneInput.value) ||
      this.phoneInput.value == ""
    ) {
      $("#alertnumber").removeClass("d-none");
    } else {
      $("#alertnumber").addClass("d-none");
    }
  }
  nameVal() {
    if (!this.namval.test(this.nameInput.value) || this.nameInput.value != "") {
      $("#alertname").removeClass("d-none");
    } else {
      $("#alertname").addClass("d-none");
    }
  }
}
