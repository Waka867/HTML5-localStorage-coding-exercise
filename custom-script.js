// Step 1. We need to gather a list of the images that we need to handle. this is generally fetched from a database
var imgArray  = [
  '0.png',
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png'
];

// This is where we dictate whether a row break will happen or not and then we append the row item, thus placing the image
var imagePlacer = function(b, rowElem, colElem, imgElem, colElemEnd, rowElemEnd, imgColID ){
  if( b ){
    $("#" + imgColID).after(colElem + imgElem + colElemEnd + rowElemEnd);

    console.log('second item' + imgColID);
  } else {
    $("#image-grid").append(rowElem + colElem + imgElem + colElemEnd);
    console.log('first item');
  }
}

// onclick Callback
// Step 2. Create click handler that takes img id and tracks when an <img> is clicked. Single clicks only for order. This should also maintain and save a count of clicks for each image
// NOTE: This had to be placed outside of the scope of this jQuery document ready function at line 1
var clickHandler = function(imgIDselector){
  // Step 3. When an img is click, thicken the border or make the image slightly smaller or darker
  $(imgIDselector).toggleClass("clicked");

  var clickedImg  = $(imgIDselector).attr('id');

  // Check to see if an item matching the imgIDselector exists in localStorage
  if(localStorage.getItem(clickedImg) == null){
    localStorage.setItem(clickedImg, "1");

    var currentCount  = localStorage.getItem(clickedImg);

    // console.log('The element ' + clickedImg + ' is not present in local storage');
    // Use jQuery to dynamically change clickCount
    $("#clickCount_" + clickedImg ).html('1');

    // If the img has not yet been clicked, add to clickCountList
    clickCountList(clickedImg, 1);

  } else {

    var currentCount  = localStorage.getItem(clickedImg);
    // If the item does exist, increment the clicked number by one then set that new value in place of the old one
    currentCount++;

    // console.log('The element ' + clickedImg + ' is already present in local storage and it has been clicked ' + currentCount + ' times.');
    localStorage.setItem(clickedImg, currentCount);

    // Use jQuery to dynamically change clickCount under img
    $("#clickCount_" + clickedImg ).html(currentCount);
    // Use jQuery to dynamically change clickCount in click count list
    $("#" + clickedImg + "_clickcount" ).html(currentCount);
    $("#" + clickedImg + "_clickcount" ).val(currentCount);

    // Adds a click count list entry even if the item has been clicked in the past
    // clickCountList(clickedImg, currentCount);
    // TODO: Make it so that either the list of click items generates on page load or an entry is added even when there was a localStorage item but check to see if it has already been added and don't add a second time
  }

  // Here we should create a call to tinySort that sorts the click list each time a click is made
  var clickCountListEntries = $("#clickCountList").children();
  tinysort(clickCountListEntries, {selector:"li > span", useValue:"true", order:'desc'});
};


// This is where we add the click count to a list visible to the user that consistently reorders itself?
var clickCountList = function(imgID, clickcount){
  $("#clickCountList").append("<li value='" + clickcount + "' id='" + imgID + "_list_item'>" + imgID + " - click count:<span id=" + imgID + "_clickcount>" + clickcount + "</span></li>");
}



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

  // Step 0. On page load, read local storage to see if a clicked items order exists and if so, set front-end img order to that saved order. Otherwise, use a default order.











  // Bonus 1 . Add a small number bubble next to the image that was clicked, in the order that it's clicked

  // Step 4. Save order of clicked items to Local Storage

  // Step 5. Insert images into DOM
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

    // var imgElem     = '<img id="' + imgID + '" src="' + imgArray[i] + '" alt="" class="img-responsive img-thumbnail handpoint center-block" onclick="clickHandler(' + imgID + ')"/><div style="text-align: center;">' + imgID + ' Click Counter:<p id="clickCount_' + imgID + '">0</p></div>';
    var imgElem     = '<img id="' + imgID + '" src="' + imgArray[i] + '" alt="" class="img-responsive img-thumbnail handpoint center-block" onclick="clickHandler(' + imgID + ')"/>';


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

    // This function builds the image grid
    // imagePlacer( i, rowElem, colElem, imgElem, colElemEnd, rowElemEnd );

  }

  // Step 6. Create button logic to sort images by saved order

  // Step 7. Create button logic to sort images by stored click count
});
