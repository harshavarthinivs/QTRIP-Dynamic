// import config from "../conf/index.js";

// async function init() {
//   console.log("from init()");
//   console.log(config.backendEndpoint + "/cities");
//   //Fetches list of all cities along with their images and description
  
//   //let cities = await fetchCities();
//   let cities = fetch(config.backendEndpoint + "/cities")
//   .then((response) => response.json())
//   // .then((data) => console.log(data));
//   .catch((err) => null);
  
//   //Updates the DOM with the cities
//   cities.forEach((key) => {
//     addCityToDOM(key.id, key.city, key.description, key.image);
//   });

//   // console.log(data)
  
//   // console.log("init",response,data);
//   return cities;
//   // }
//   // catch (err) {
//   //   return null;
//   // }
// }

// //Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {
//   // TODO: MODULE_CITIES
//   // 1. Populate the City details and insert those details into the DOM



//   let getDatadiv = document.getElementById("data");

//   let sub_div = document.createElement("div");
//   sub_div.setAttribute("class", "col-sm-12 col-md-6 col-lg-3 mt-4");

//   let sub_div1=document.createElement("div");
//   sub_div1.setAttribute("class","tile")
  

//   let div_text=document.createElement("div");
//   div_text.setAttribute("class","tile-text text-center text-light justify-content-end d-flex flex-column")
//   // image
//   let image1 = document.createElement("img");
//   image1.setAttribute("src", image);
//   // <a href="pages/adventures/?city=${id}"></a>
//   let link=document.createElement("a");
//   link.setAttribute("id",id);
//   link.setAttribute("href","pages/adventures/?city="+id);

//   // description
//   let des = document.createElement("p");
//   let des_text = document.createTextNode(description);
//   des.append(des_text);
//   // city
//   let city_name = document.createElement("h4");
//   let city_name_text = document.createTextNode(city);
//   city_name.append(city_name_text);
//   //
//   div_text.append(city_name,des);
//   sub_div1.append(image1,div_text);
//   sub_div.append(link);
//   link.append(sub_div1);

//   getDatadiv.append(sub_div);

  

//   // return sub_div;
// }
// export {init,fetchCities,addCityToDOM};


import config from "../conf/index.js";

async function init() {
  console.log("From init");
  console.log(config.backendEndpoint + "/cities");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    var cities = await fetch(config.backendEndpoint + "/cities");
    let data = await cities.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  console.log("addCityToDOM");
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  // <div class="col-lg-3 col-sm-6 mb-4 col-12">
  //   <a href="pages/adventures/index.html">
  //     <div class="tile">
  //       <img src="assets/bengaluru.jpg" class="rounded" alt="Bengalore" />
  //       <div class="tile-text text-center text-light d-flex flex-column justify-content-end">
  //         <h4>Bengalore</h4>
  //         <p>100+ places</p>
  //       </div>
  //     </div>
  //   </a>
  // </div>;
  //========== my code

  var data_id = document.getElementById("data");
  var element = document.createElement("div");

  element.setAttribute("class", "col-lg-3 col-sm-6 mb-4 col-12");

  var anchorTag = document.createElement("a");
  anchorTag.setAttribute("id",id);
  anchorTag.setAttribute("href", "pages/adventures/?city=" + id);

  var tilediv = document.createElement("div");
  tilediv.setAttribute("class", "tile");

  var img = document.createElement("img");
  img.setAttribute("src",image);
  img.setAttribute("class","rounded");
  img.setAttribute("alt",id);

  var tileTextdiv = document.createElement("div");
  tileTextdiv.setAttribute("class","tile-text");//text-center text-light d-flex flex-column justify-content-end");

  var h5 = document.createElement("h5");
  h5.setAttribute("class","text-center");
  h5.innerText=city;

  var p = document.createElement("p");
  p.innerText = description;

  tileTextdiv.append(h5);
  tileTextdiv.append(p);

  tilediv.append(img);
  tilediv.append(tileTextdiv);

  anchorTag.append(tilediv);

  element.append(anchorTag);
  data_id.append(element);

  //========== my code
  // anchorTag.innerHTML = `
  //       <div class="tile">
  //           <img
  //           src="${image}"
  //           class="rounded"
  //           alt="${id}"
  //           />
  //           <div
  //           class="tile-text text-center text-light d-flex flex-column justify-content-end"
  //           >
  //               <h4>${city}</h4>
  //               <p>${description}</p>
  //           </div>
  //       </div>
  // `;
  //=============

  // let data = document.getElementById("data");
  // let anchorTag = document.createElement("a");
  // let column = document.createElement("div");
  // anchorTag.setAttribute("href", "pages/adventures/?city=" + id);
  // anchorTag.setAttribute("id", id);
  // data.appendChild(column);
  // column.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4");
  // let mainDiv = document.createElement("div");
  // mainDiv.setAttribute("class", "tile");
  // anchorTag.appendChild(mainDiv);
  // column.appendChild(anchorTag);
  // let img = document.createElement("img");
  // img.setAttribute("src", image);
  // mainDiv.appendChild(img);
  // let tileTexDiv = document.createElement("div");
  // tileTexDiv.setAttribute("class", "tile-text");
  // mainDiv.appendChild(tileTexDiv);
  // let tileHead = document.createElement("h5");
  // tileHead.setAttribute("class", "text-center");
  // tileHead.innerText = city;
  // tileTexDiv.appendChild(tileHead);
  // let tileDescription = document.createElement("p");
  // tileDescription.innerText = description;
  // tileTexDiv.appendChild(tileDescription);
}

export { init, fetchCities, addCityToDOM };
