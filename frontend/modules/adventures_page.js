import config from "../conf/index.js";

let adventuresCopy = "";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let urlParams = new URLSearchParams(search);
  console.log("searh",search);
  let params = urlParams.get("city");
  // console.log(params);
  if (params == null) {
    params = "";
    //  return params;
  } else {
    // console.log("params after",params);
    return params;
  }
  //  console.log("Parameter", params);
  return params;
}
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log(city);

  //   let response=await(adv_cities.json);
  //   console.log(response);
  // }
  // catch(err){
  //   return null;

  // }
  let adv_cities = await fetch(
    config.backendEndpoint + "/adventures?city=" + city
  )
    .then((response) => response.json())
    .catch((err) => null);
  // console.log(adv_cities);
  adventuresCopy = adv_cities;///extra added
  return adv_cities;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
// 1. Populate the Adventure Cards and insert those details into the DOM
function addAdventureToDOM(adventures) {
  // console.log("adventures",adventures);
  let adv_main = document.getElementById("data");
  for (let i = 0; i < adventures.length; i++) {
    let adv_col = document.createElement("div");
    adv_col.setAttribute("class", "col-lg-3 mb-4 ");

    let anchortag = document.createElement("a");
    anchortag.setAttribute("id", adventures[i].id);
    anchortag.setAttribute("href", "detail/?adventure=" + adventures[i].id);

    let adv_tile = document.createElement("div");
    adv_tile.setAttribute("class", "activity-card");
    //image
    let adv_img = document.createElement("img");
    adv_img.setAttribute("src", adventures[i].image);

    //category

    let adv_category = document.createElement("p");
    adv_category.setAttribute("class", "category-banner");
    let adv_name_category = document.createTextNode(adventures[i].category);
    adv_category.append(adv_name_category);

    //card body

    let cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body pb-0");

    let cardtext = document.createElement("div");
    cardtext.setAttribute(
      "class",
      "card-text d-lg-flex justify-content-lg-between flex-wrap w-100"
    );
    //first row text
    let adv_name = document.createElement("p");
    let adv_name_text = document.createTextNode(adventures[i].name);

    adv_name.append(adv_name_text);
    let adv_cost = document.createElement("p");

    adv_cost.innerHTML = `&#8377;<span class="amount-in-rupees">${adventures[i].costPerHead}</span>`;

    //2nd row text
    let cardtext1 = document.createElement("div");
    cardtext1.setAttribute(
      "class",
      "card-text d-lg-flex justify-content-lg-between flex-wrap w-100"
    );

    let adv_name1 = document.createElement("p");
    let adv_name_text1 = document.createTextNode("Duration");

    adv_name1.append(adv_name_text1);
    let adv_cost1 = document.createElement("p");

    adv_cost1.innerHTML = adventures[i].duration + " hours";

    cardtext.append(adv_name, adv_cost);
    cardtext1.append(adv_name1, adv_cost1);

    cardbody.append(cardtext, cardtext1);

    adv_tile.append(adv_img, adv_category, cardbody);
    anchortag.append(adv_tile);
    adv_col.append(anchortag);

    adv_main.append(adv_col);

    //console.log(adv_col);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  //console.log("inside duration",list,low,high);
  let dur_list = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].duration >= low && list[i].duration <= high) {
      console.log("list i", list[i].duration);
      dur_list.push(list[i]);
    }
  }
  // console.log("duration_list",dur_list);
  return dur_list;

  // console.log(list);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(list);
  // console.log(categoryList);
  // console.log(list.length);
  let newlist = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (list[i].category === categoryList[j]) {
        if (!newlist.includes(categoryList[j])) newlist.push(list[i]);
      }
    }
  }
  list = newlist;
  // console.log("newlist",newlist);
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(list,filters);
  // console.log(filters);
  // console.log(typeof(filters));
  if (filters.category.length != 0 && filters.duration != "") {
    let list1 = [];
    list1 = filterByCategory(list, filters.category);
    // console.log("list1",list1);

    let chars = filters.duration.split("-");
    let low = chars[0];
    let high = chars[1];
    list = filterByDuration(list1, low, high);
    return list;
  } else if (filters.category.length != 0) {
    list = filterByCategory(list, filters.category);
    return list;
  } else if (filters.duration != "") {
    // { console.log("duration func call")
    let chars = filters.duration.split("-");
    let low = chars[0];
    let high = chars[1];
    list = filterByDuration(list, low, high);
    return list;
  } else {
    return list;
  }

  // Place holder for functionality to work in the Stubs
  //return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // console.log("localstorage",filters);
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(window.localStorage.getItem("filters"));

  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

// function generateFilterPillsAndUpdateDOM(filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
//   // function generateFilterPillsAndUpdateDOM(filters) {
//     // TODO: MODULE_FILTERS
//     // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
// }

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryList = document.getElementById("category-list");
  console.log(filters);
  if (filters.duration != "") {
    document.getElementById("duration-select").value = filters.duration;
  }
  filters.category.forEach((category, index) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "category-filter");
    categoryDiv.setAttribute("style", "position: relative");

    const categoryText = document.createElement("span");
    categoryText.setAttribute("class", "me-3");
    categoryText.textContent = category;

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "btn");
    closeBtn.setAttribute("style", "position: absolute;right:0;top:0");
    closeBtn.innerHTML = `
    <i class="fa fa-close"></i>
    `;
    closeBtn.addEventListener("click", () => {
      filters.category.splice(index, 1);
      document.getElementById("data").innerHTML = "";
      categoryList.innerHTML = "";
      generateFilterPillsAndUpdateDOM(filters);
      let filteredAdventures = filterFunction(adventuresCopy, filters);
      addAdventureToDOM(filteredAdventures);
      saveFiltersToLocalStorage(filters);
    });

    categoryDiv.append(categoryText);
    categoryDiv.append(closeBtn);
    categoryList.append(categoryDiv);
  });
}

function closeFunction() {
  var closebtns = document.getElementsByClassName("btn-close");
  var i;

  for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

getCityFromURL();
