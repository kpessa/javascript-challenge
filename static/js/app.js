// from data.js

// YOUR CODE HERE!
let tbody = d3.select("tbody")

// Initially: Build a table

const constructTable = (filterFunction) => {
  data.filter(filterFunction).forEach( function (ufoSighting) {
    // console.log(item)
    let row = tbody.append("tr");
    Object.values(ufoSighting).forEach((datum, index) => {
      var cell = row.append("td");
      switch (index) {
        case 1: cell.text(capitalizeCity(datum));break;
        case 4: cell.text(datum.charAt(0).toUpperCase() + datum.slice(1));break;
        case 2: case 3: cell.text(datum.toUpperCase());break;
        default: cell.text(datum)
      }
    })
  })
}

const capitalizeCity = city => city.split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");



constructTable ((row) => true)

// Constructing datalist for input
var dates = data.map(item=>item.datetime)
dates = dates.filter((item,index,self)=>self.indexOf(item)===index)
dates.forEach(item=>d3.select("#dates").append("option").attr("value",item))

var cities = data.map(item=>capitalizeCity(item.city))
cities = cities.filter((item,index,self)=>self.indexOf(item)===index)
cities.sort()
cities.forEach(item=>d3.select("#cities").append("option").attr("value",item))

var states = data.map(item=>item.state.toUpperCase())
states = states.filter((item,index,self)=>self.indexOf(item)===index)
states.sort()
states.forEach(item=>d3.select("#states").append("option").attr("value",item))

var countries = data.map(item=>item.country.toUpperCase())
countries = countries.filter((item,index,self)=>self.indexOf(item)===index)
countries.sort()
countries.forEach(item=>d3.select("#countries").append("option").attr("value",item))

var shapes = data.map(item=>item.shape.charAt(0).toUpperCase()+item.shape.slice(1))
shapes = shapes.filter((item,index,self)=>self.indexOf(item)===index)
shapes.sort()
shapes.forEach(item=>d3.select("#shapes").append("option").attr("value",item))


let filterBtn = d3.select("#filter-btn")

const filterHandler = () => {
  event.preventDefault(); // prevent page refresh

  var inputText = document.getElementById("datetime").value
  var cityInput = document.getElementById("city").value
  var stateInput = document.getElementById("state").value
  var countryInput = document.getElementById("country").value
  var shapeInput = document.getElementById("shape").value
  
  tbody.selectAll("tr").remove()

  constructTable((row) => {
    let dateCheck = !inputText || inputText === row.datetime
    let cityCheck = !cityInput || cityInput === capitalizeCity(row.city)
    let stateCheck = !stateInput || stateInput === row.state.toUpperCase()
    let countryCheck = !countryInput || countryInput === row.country.toUpperCase()
    let shapeCheck = !shapeInput || shapeInput === row.shape.charAt(0).toUpperCase() + row.shape.slice(1)

    return dateCheck && cityCheck && stateCheck && countryCheck && shapeCheck

    
  })
  document.getElementById("datetime").value = ""
  d3.select("#datetime").attr("placeholder", () => inputText ? inputText : "1/11/2010")
  document.getElementById("city").value = ""
  d3.select("#city").attr("placeholder", () => cityInput ? cityInput : "Benton")
  document.getElementById("state").value = ""
  d3.select("#state").attr("placeholder", () => stateInput ? stateInput : "AK")
  document.getElementById("country").value = ""
  d3.select("#country").attr("placeholder", () => countryInput ? countryInput : "US")
  document.getElementById("shape").value = ""
  d3.select("#shape").attr("placeholder", () => shapeInput ? shapeInput : "Light")
};

filterBtn.on("click", filterHandler) 





// This will be run when you first load the page

// See 14-3 Ex03 for example code

// Handle Filter Button

// Create  a function:
//    Filter data where datetime===input
//    For help with input value: see 14-3 Ex08
//    For help with filter: see 14-2 Ex09

//    Before you can append new rows, you must clear the html in the tbody

//    Foreach on filtered data:
//    Build table