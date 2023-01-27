import { FirstPage } from "./category.js";

let categories = new FirstPage();
export class Area {
  constructor() {
    this.areaContainer = document.getElementById("areaContainer");
    $("#areaLink").click(() => {
      $(".areaSection").removeClass("d-none");
      $(".CategorySection").addClass("d-none");
      $(".seaech").addClass("d-none");
      $(".contactSection").addClass("d-none");
      $(".IngreSection").addClass("d-none");
      $(".mainSection").addClass("d-none");
      $(".detailes").addClass("d-none");
      this.showArea();
    });
  }
  async showArea() {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < 20; i++) {
      x += `<div class="col-6  col-md-4 col-lg-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  text-center ">
            <i id="lFactor[${i}]"class="fa-solid fa-city fa-3x text-danger"></i>
            <div   class="  rounded   text-center   "><h6 class="m-5 text-danger">${dataList[i].strArea}<h6/>
            </div>
            </div></div>`;
    }
    this.areaContainer.innerHTML = x;
    for (let i = 0; i < 20; i++) {
      let d = document.getElementById(`lFactor[${i}]`);

      d.addEventListener("click", () => {
        this.secrchArea(dataList[i].strArea);
      });
    }
  }
  async secrchArea(area) {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < dataList.length; i++) {
      x += `<div class="col-12 col-sm-6 col-md-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"   src="${dataList[i].strMealThumb}" alt="">
            <div id="aFactor[${i}]" class="hoverdiv  rounded   text-center   "><h6 class="m-5">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`;
    }
    this.areaContainer.innerHTML = x;
    for (let i = 0; i < dataList.length; i++) {
      let d = document.getElementById(`aFactor[${i}]`);

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
