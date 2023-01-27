/// <reference path="../typings/globals/jquery/index.d.ts" />
export class FirstPage {
  constructor() {
    this.CategorySection = document.getElementById("CategorySection");
    this.detailes = document.getElementById("detailes");
    this.mainSection = document.getElementById("mainSection");
    this.displayNone = () => {
      $(".contactSection").addClass("d-none");
      $(".IngreSection").addClass("d-none");
      $(".areaSection").addClass("d-none");
      $(".search").addClass("d-none");
    };

    $("#CategoryLink").click((e) => {
      $(".mainSection").addClass("d-none");
      $(".detailes").addClass("d-none");
      this.displayNone();
      $(".CategorySection").removeClass("d-none");
    });
    this.showData();
  }

  async fetchApi(Api) {
    let response = await fetch(Api);
    let result = await response.json();
    return result;
  }
  async showData() {
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let dataList = response.categories;
    console.log(dataList);
    let x = "";
    for (let i = 0; i < dataList.length; i++) {
      x += `<div class="col-6  col-md-4 col-lg-3 ccc justify-content-center m-3">
        
        <div class-""><img class="w-100  rounded  "  src=${dataList[i].strCategoryThumb} alt="">
            <div id="xFactor[${i}]"
            
            class="hoverdiv  ccc  rounded   text-center  "><h5> ${dataList[i].strCategory}</h5>
            <p>
            ${dataList[i].strCategoryDescription}</p>
            </div>
            </div>
            </div>`;
    }

    this.CategorySection.innerHTML = x;

    for (let i = 0; i < dataList.length; i++) {
      let d = document.getElementById(`xFactor[${i}]`);
      d.addEventListener("click", () => {
        dataList;

        this.categoryLink(dataList[i].strCategory);
        console.log("nnnnnnnnnnnn");
      });
    }
  }
  async categoryLink(cateoryName) {
    this.displayNone();
    $(".CategorySection").addClass("d-none");
    $(".mainSection").removeClass("d-none");
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cateoryName}`
    );

    let x = "";
    let dataList = response.meals;

    for (let i = 0; i < dataList.length; i++) {
      x += `<div class="col-6  col-md-4 col-lg-3 ccc justify-content-center  rounded p-5   ">
            <div class=" position-relative  ">
            <img class="w-100  rounded   bg-danger"  src=${dataList[i].strMealThumb} alt="">
            <div id="yFactor[${i}]"  class="hoverdiv rounded text-center "><h6 class="text-info">${dataList[i].strMeal}<h6/>
            </div>
            </div></div>`;
    }
    this.mainSection.innerHTML = x;

    for (let i = 0; i < dataList.length; i++) {
      let theElement = document.getElementById(`yFactor[${i}]`);

      theElement.addEventListener("click", () => {
        this.Instructions(dataList[i].strMealThumb, dataList[i].strMeal);
      });
    }
  }
  async Instructions(strMealThumb, strMeal) {
    $(".CategorySection").addClass("d-none");
    $(".mainSection").addClass("d-none");
    $(".detailes").removeClass("d-none");
    this.displayNone();
    let response = await this.fetchApi(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`
    );
    let tag = "";
    let x = "";
    let y = "";
    let dataList = response.meals;
    for (let i = 1; i < 20; i++) {
      if (dataList[0][`strMeasure${i}`]) {
        console.log(dataList[0][`strMeasure${i.length}`]);
        y +=
          dataList[0][`strMeasure${i}`] && dataList[0][`strMeasure${i}`] != " "
            ? `<span class="d-inline-block m-1 py-2 px-3 bg-info opacity-10 rounded">${
                dataList[0][`strMeasure${i}`]
              } ${dataList[0][`strIngredient${i}`]}</span>`
            : `<span class="d-none"></span>`;
      }
    }
    let newArr = [];
    if (dataList[0].strTags != null) {
      newArr = [...dataList[0].strTags.split(",")];

      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i]) {
          tag += `
                <span class="d-inline-block m-1 py-2 px-3 bg-danger opacity-10 rounded">${newArr[i]}</span>`;
        }
      }
    }

    x = `
                <div class="col-lg-4 col-12 overflow-hidden ">
                <div ><img class="w-100" src="${strMealThumb}" alt=""></div>
                <h3>${strMeal}</h3>
                </div>
                <div class="col-lg-8 col-12">
                    <h3>Instructions</h3>
                    <p>${dataList[0].strInstructions}</p>
                    <h6>Area :<span>${dataList[0].strArea}</span></h6>
                    <h6>Category :<span>${dataList[0].strCategory}</span></h6>
                    <h3>Recipes :</h3>
                    ${y}  
                    ${
                      newArr[0]
                        ? " <h3 class='my-2'>Tags :</h3>"
                        : " <div class='d-none'></div>"
                    }
                    ${tag}
                    ${
                      dataList[0].strSource || dataList[0].strYoutube
                        ? " <h3 class='my-2'>Links :</h3>"
                        : " <div class='d-none'></div>"
                    }
                    <div>
                        <a target="_blank" href="${
                          dataList[0].strSource
                        }"  class=" btn btn-success m-1">source</a>
                        <a target="_blank" href="${
                          dataList[0].strYoutube
                        }" class=" btn btn-danger m-1 ">Youtube</a>
                    </div>

                        
                </div>`;
    this.detailes.innerHTML = x;
  }
}
