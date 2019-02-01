// We need to gather a list of the images that we need to handle. this is generally fetched from a database
// If there is a clickOrder array present do not use until you run out of click array items
var defaultImgArray  = [
  '0.png',
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png'
];



// This holds img click order until ready to insert on save button press
var imgClickOrder = [];



// Step 6. Create button logic to sort images by saved order. This function converts imgClickOrder array to JSON string then sets as clickorder in localStorage
var addToClickOrderList = function(imgClickOrder){
  if(imgClickOrder.length == 0){
    alert('Please select images in the order you would like them, then click save.');
  } else {
    // If imgClickOrder length is less than the defaultImgArray take any elements not in imgClickOrder that are in defaultImgArray and push them onto the end of imgClickOrder
    if(imgClickOrder.length < defaultImgArray.length){

      var defaultImgArrayFiltered = defaultImgArray.filter(function(arrayItem){
        // Returns value of defaultImgArray if it was not found in the imgClickOrder (indexOf returns -1 if not found)
        return imgClickOrder.indexOf(arrayItem) == -1;
      });

      // Pushes remaining defaultImgArray images onto the end of the imgClickOrder array to be added to the image grid
      for(i = 0; i < defaultImgArrayFiltered.length; i++){
        imgClickOrder.push(defaultImgArrayFiltered[i]);
      }
    }

    // Turn imgClickOrder into a string prior to storage
    var order = JSON.stringify(imgClickOrder);
    localStorage.setItem('clickOrder', order);
    // Refreshes page
    location.reload();
    alert('Your image order has been successfully saved!');
  }
}


// Resets image order back to default
var resetClickOrderList = function(imgClickOrder){
  var resetConfirm = confirm("Are you sure you want to reset the image order?");

  if(resetConfirm){
    // var order = JSON.stringify(imgClickOrder);
    localStorage.removeItem('clickOrder');
    // Refreshes page
    location.reload();
    alert('Your image order has been successfully reset');

  }
}



// This is where we dictate whether a row break will happen or not and then we append the row item, thus placing the image
var imagePlacer = function(b, rowElem, colElem, imgElem, colElemEnd, rowElemEnd, imgColID ){
  if( b ){
    $("#" + imgColID).after(colElem + imgElem + colElemEnd + rowElemEnd);
  } else {
    $("#image-grid").append(rowElem + colElem + imgElem + colElemEnd);

  }
}



// Create click handler that takes img id and tracks when an <img> is clicked. Single clicks only for order. This should also maintain and save a count of clicks for each image
var clickHandler = function(imgIDselector, imgFile){
  // When an img is click, thicken the border to indicate click status or else users will be confused
  $(imgIDselector).toggleClass("clicked");

  var clickedImg  = $(imgIDselector).attr('id');

  var currentCount  = localStorage.getItem(clickedImg);
  // Check to see if an item matching the imgID selector exists in localStorage
  if(localStorage.getItem(clickedImg) == null){
    localStorage.setItem(clickedImg, "1");
    // Gets currentCount after being set to 1 to start
    var currentCount  = localStorage.getItem(clickedImg);

    // Changes click count to 1 to start off newly clicked item
    $("#clickCount_" + clickedImg ).html('1');

    // Use jQuery to dynamically change clickCount in click count list
    $("#" + clickedImg + "_clickcount" ).html(currentCount);
    $("#" + clickedImg + "_clickcount" ).val(currentCount);
  } else {


    // If the item does exist, increment the clicked number by one then set that new value in place of the old one
    currentCount++;

    localStorage.setItem(clickedImg, currentCount);

    // Use jQuery to dynamically change clickCount in click count list
    $("#" + clickedImg + "_clickcount" ).html(currentCount);
    $("#" + clickedImg + "_clickcount" ).val(currentCount);

  }


  // Image click creates a key value pair entry in a clickOrder array that is later stringified to JSON (since localStorage only does strings and JSON is compatible). This will be similar to how the image clickCounts are stored, except that clicking an img that was already clicked will remove a count instead of add a count.
  var clickOrderList  = localStorage.getItem('clickOrder');
  // Add if statement to see if the imgFile is a value in localStorage clickOrder
  if(imgClickOrder.includes(imgFile)){
    // Remove the array img file name from the clickOrder if the imgFile is already in the array
    imgClickOrder.splice($.inArray(imgFile, imgClickOrder),1);
    // Preps for removing click count indicator
    // var countToRemove = "#" + imgIDselector.id + "_count_num";
    // Removes click count after user clicks an img that already has an entry in the imgClickOrder
    // $(countToRemove).remove();
  } else {
    // Adds imgFile to array that will get saved to localStorage
    imgClickOrder.push(imgFile);
    // Here we grab the index location of the imgFile we just added.
    var coGet = $.inArray(imgFile, imgClickOrder);
    // Offset from zero indexing so that click order indicator makes sense
    var co    = coGet + 1;
    // Here is where we add the number on or next to the image that corresponds to click order
    // $(imgIDselector).after("<div class='text-center' id='" + imgIDselector.id + "_count_num'>Click Order: " + co + "</div>");
  }



  // Function call to tinySort that dynamically sorts the click count list each time a click is made
  var clickCountListEntries = $("#clickCountList").children();
  tinysort(clickCountListEntries, {selector:"li > span", useValue:"true", order:'desc'});
};



// This is where we add the click count to a list visible to the user that consistently reorders itself?
var clickCountList = function(imgID, clickcount){
  $("#clickCountList").append("<li value='" + clickcount + "' id='" + imgID + "_list_item'>" + imgID + " - click count:<span id=" + imgID + "_clickcount>" + clickcount + "</span></li>");
}




// This makes it so some functions are not initialize until the document tree has completed loading
$(document).ready(function() {
  function storageAvailable(type) {
      try {
          var storage = window[type],
              x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
      }
      catch(e) {
          return e instanceof DOMException && (
              // everything except Firefox
              e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              // test name field too, because code might not be present
              // everything except Firefox
              e.name === 'QuotaExceededError' ||
              // Firefox
              e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
              // acknowledge QuotaExceededError only if there's something already stored
              storage.length !== 0;
      }
  }

  if (storageAvailable('localStorage')) {
    // Sweet
  } else {
    alert('Local storage not supported on the browser. Please try another or update your current browser to the newest version.');
  }

  // On page load, read local storage to see if a clicked items order exists and if so, set front-end img order to that saved order. Otherwise, use a default order.
  var previousOrder = localStorage.getItem('clickOrder');

  // If a previous order array exists use that, otherwise use the defaultimgArray
  if(previousOrder){
    var imgArray = JSON.parse(previousOrder);
  } else {
    var imgArray = defaultImgArray;
  }

  // Insert images into DOM
  for (var i = 0; i < imgArray.length; i++) {
    /*
    // I need a way of breaking up the rows in such a way that there will always be rows of two no matter how many images are added. Here I'm working out what the commonalities and differences are to find a condition of i that can trigger the layout breaks.
    0/2 = 0
    0%2 = 0
    1/2 = .5 (product is less than two but greater than 0)
    1%2 = 1 (modulus greater than 0 but less than 2)

    2/2 = 1 (product less than 2 but greater than 0)
    2%2 = 0 (modulus = 0 but < 2)
    3/2 = 1.5
    3%2 = 1
    Looks like way to trigger is to close row and create a new one when i % 2 = 1.
    */

    var imgID       = "img_" + i;

    var imgColID    = "img_col_" + i;

    var rowID       = "row_" + i;

    var rowElem     = '<div class="row" id="' + rowID +'">';

    var colElem     = '<div class="col-md-6" id="' + imgColID + '">';

    var imgElem     = '<img id="' + imgID + '" src="' + imgArray[i] + '" alt="" class="img-responsive img-thumbnail handpoint center-block" onclick="clickHandler(' + imgID + ', \'' + imgArray[i] + '\')"/>';

    var colElemEnd  = '</div>';

    var rowElemEnd  = '</div>';

    // Checks to see when we need to trigger a row close or not then build grid
    if( (i % 2) === 1 ){
      var b  = 1;
      imgColID = "img_col_" + (i - 1);
      imagePlacer( b, rowElem, colElem, imgElem, colElemEnd, rowElemEnd, imgColID );
    } else {
      var b = 0;
      imagePlacer( b, rowElem, colElem, imgElem, colElemEnd, rowElemEnd, imgColID );
    }

    // Get imgID in localStorage. True if present, false if not.
    var cCount  = localStorage.getItem(imgID);
    // If the imgID already exists as a key, update the image click count then re-sort the list
    if(cCount){
      // Add click count list entry
      clickCountList(imgID, cCount);

      var clickCountListEntries = $("#clickCountList").children();
      tinysort(clickCountListEntries, {selector:"li > span", useValue:"true", order:'desc'});
    } else {
      // Add default click count list entry of 0
      clickCountList(imgID, 0);
    }


  }
});
