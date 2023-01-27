import { FirstPage } from "./category.js";

let categories = new FirstPage();
("a");
export class SearchPage {
  constructor() {
    this.regex = new RegExp(/^[a-zA-Z]{1}$/);
    this.regexWord = new RegExp(/^[a-zA-Z]{1,13}$/);

    $("#searchLink").click(function () {
      $(".CategorySection").addClass("d-none");
      $(".areaSection").addClass("d-none");
      $(".IngreSection").addClass("d-none");
      $(".contactSection").addClass("d-none");
      $(".search").removeClass("d-none");
      $(".mainSection").addClass("d-none");
      $(".detailes").addClass("d-none");
    });
    this.showData();

    this.letterInput = document.getElementById("letterInput");
    this.searchPlace = document.getElementById("conayin");
    this.searchInput = document.getElementById("nameSearchInput");
    this.searchInput.addEventListener("keyup", (e) => {
      this.showData(
        this.regexWord.test(
          e.target.value.slice(0, 1).toLocaleUpperCase() +
            e.target.value.substring(1)
        )
          ? true
          : false
      )
        ? this.categorySecrch(
            e.target.value.slice(0, 1).toLocaleUpperCase() +
              e.target.value.substring(1)
          )
        : "";
    });

    this.letterInput.addEventListener("keyup", (e) => {
      this.regex.test(e.target.value) &&
      this.Secrchletter(e.target.value.slice(0, 1))
        ? this.Secrchletter(e.target.value.slice(0, 1))
        : "a";
    });
  }
  async showData(input) {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let dataList = response.categories;
    let box = [];
    for (let i = 0; i < dataList.length; i++) {
      box.push(dataList[i].strCategory);
    }

    return box.includes(input);
  }

  async categorySecrch(cateoryName) {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cateoryName}`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < dataList?.length; i++) {
      x += `<div class="col-6  col-md-4 col-lg-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"  src=${dataList[i].strMealThumb} alt="">
            <div id="rFactor[${i}]"  class="hoverdiv  rounded   text-center   "><h6 class="m-5">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`;
    }
    this.searchPlace.innerHTML = x
      ? x
      : `<h2 class="w-100 text-center"> No Result Match</h2>`;
    for (let i = 0; i < dataList?.length; i++) {
      let d = document.getElementById(`rFactor[${i}]`);

      d.addEventListener("click", () => {
        categories.Instructions(dataList[i].strMealThumb, dataList[i].strMeal);
      });
    }
  }
  async Secrchletter(cateoryName) {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${cateoryName}`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < dataList?.length; i++) {
      x += `<div class="col-6  col-md-4 col-lg-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"  src=${dataList[i].strMealThumb} alt="">
            <div id="zFactor[${i}]"  class="hoverdiv  rounded   text-center   "><h6 class="m-5">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`;
    }
    this.searchPlace.innerHTML = x
      ? x
      : `<h2 class="w-100 text-center"> No Result Match</h2>`;
    for (let i = 0; i < dataList?.length; i++) {
      let d = document.getElementById(`zFactor[${i}]`);

      d.addEventListener("click", () => {
        categories.Instructions(dataList[i].strMealThumb, dataList[i].strMeal);
      });
    }
  }
  async fetchApi(Api) {
    let response = await fetch(Api);
    let result = await response.json();
    return result;
  }
}
