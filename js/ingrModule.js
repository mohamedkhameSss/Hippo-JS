import { FirstPage } from "./category.js";

let categories = new FirstPage();
export class strIngredient {
  constructor() {
    this.IngredieContainer = document.getElementById("IngredieContainer");
    $("#Ingredients").click(() => {
      $(".IngreSection").removeClass("d-none");
      $(".CategorySection").addClass("d-none");
      $(".search").addClass("d-none");
      $(".areaSection").addClass("d-none");
      $(".contactSection").addClass("d-none");
      $(".mainSection").addClass("d-none");
      $(".detailes").addClass("d-none");
      this.showIngr();
    });
  }

  async showIngr() {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < 20; i++) {
      x += `<div class="col-6  col-md-4 col-lg-3 ccc justify-content-center  rounded p-3   ">
            <div id="wFactor[${i}]" class=" position-relative  text-center overflow-hidden ">
            <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
            <div   class="  rounded   text-center  ">
            <h6 class="mt-1 text-light">${dataList[i].strIngredient}<h6/>
            <p class=" max text-light">${[dataList[i].strDescription]}</p>
            </div>
            </div></div>`;
    }
    this.IngredieContainer.innerHTML = x;
    for (let i = 0; i < 20; i++) {
      let d = document.getElementById(`wFactor[${i}]`);

      d.addEventListener("click", () => {
        this.secrchIngr(dataList[i].strIngredient);
      });
    }
  }
  async fetchApi(Api) {
    let response = await fetch(Api);
    let result = await response.json();
    return result;
  }
  async secrchIngr(ingr) {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < dataList.length; i++) {
      x += `<div class="col-12 col-sm-6 col-md-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"   src="${dataList[i].strMealThumb}" alt="">
            <div id="vFactor[${i}]" class="hoverdiv  rounded   text-center   "><h6 class="m-5">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`;
    }
    this.IngredieContainer.innerHTML = x;
    for (let i = 0; i < dataList.length; i++) {
      let d = document.getElementById(`vFactor[${i}]`);

      d.addEventListener("click", () => {
        categories.Instructions(dataList[i].strMealThumb, dataList[i].strMeal);
      });
    }
  }
}
