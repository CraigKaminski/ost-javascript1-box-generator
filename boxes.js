// initialize global array to hold box objects
var boxes = [];
// initialize global variable for generating unique IDs
var counter = 0;

window.onload = init;

// set the event handlers for the generate and clear buttons
function init() {
  var generateButton = document.getElementById("generateButton");
  generateButton.onclick = generate;
  var clearButton = document.getElementById("clearButton");
  clearButton.onclick = clear;
}

// constructor for box object
function Box(id, name, color, x, y) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.x = x;
  this.y = y;
  
  // method to create div element that represents box object
  this.createDiv = function() {
    var div = document.createElement("div");
    div.setAttribute("class", "box");
    div.setAttribute("id", this.id);
    div.style.left  = this.x + "px";
    div.style.top = this.y + "px";
    div.innerHTML = this.name;
    div.style.backgroundColor = this.color;
    return div;
  }
}

// handler for generate button onclick event
function generate() {
  // retrieve form collection
  var dataForm = document.forms.data;
  
  // retrieve value of name text input and ensure it's not empty
  var name = dataForm.elements.name.value;
  if (name == "") {
    alert("Please enter a name for the boxes!");
  }
  
  // retrieve value of color drop down input
  var color = dataForm.elements.color.value;
  
  // retrieve array of radio buttons
  var amountArray = dataForm.elements.amount;
  // create a variable to hold the number of boxes once found in array
  var amount = 0;
  // loop through array to find selected radio button
  for (var i = 0; i < amountArray.length; i++) {
    if (amountArray[i].checked) {
      amount = amountArray[i].value;
    }
  }
  
  // if none of the radio buttons were selected generate alert
  if (amount == 0) {
    alert("Please choose a number of boxes!");
  }
  
  // if provided form data is complete, create box div elements
  if (name && amount != 0) {
    // loop to create specified number of div elements
    for (var i = 0; i < amount; i++) {
      // use counter variable as unique ID of box
      var id = counter;
      counter++;
      
      // retrieve scene div
      var sceneDiv = document.getElementById("scene");
      
      // randomly generat position of box
      var x = Math.floor(Math.random() * (sceneDiv.offsetWidth - 101));
      var y = Math.floor(Math.random() * (sceneDiv.offsetHeight - 101));
      
      // create box object and add to boxes array
      var box = new Box(id, name, color, x, y);
      boxes.push(box);
      
      // creat box div and set onclick event handler
      boxDiv = box.createDiv();
      boxDiv.onclick = display;
      
      // add box div to scene div
      sceneDiv.appendChild(boxDiv);
    }
    // reset form once boxes are successfully created
    dataForm.reset();
  }
}

// handler for clear button onclick event
function clear() {
  // retrieve scene div
  var sceneDiv = document.getElementById("scene");
  
  // loop through boxes array
  for (var i = 0; i < boxes.length; i++) {
    // retrieve id of box object
    var id = boxes[i].id;
    // find box div with that id in the DOM
    var boxDiv = document.getElementById(id);
    // remove box div from scene div
    sceneDiv.removeChild(boxDiv);
  }
  
  // reset boxes array and counter variable
  boxes = [];
  counter = 0;
}

// handler for box div onclick event
function display(e) {
  // retrieve box div
  var div = e.target;
  // get id of box div
  var divId = div.getAttribute("id");
  
  // loop through boxes array looking for box object with same ID as div
  for (var i = 0; i < boxes.length; i++) {
    if (divId == boxes[i].id) {
      // once matching id is found generate alert with desired information about box object
      var id = boxes[i].id;
      var name = boxes[id].name;
      var color = boxes[id].color;
      var x = boxes[id].x;
      var y = boxes[id].y;
      alert("You clicked on a box with id " + id + ", named " + name + ", whose color is " + color + ", at position " + x + ", " + y);
    }
  }
}