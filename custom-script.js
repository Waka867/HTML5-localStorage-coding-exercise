$(document).ready(function() {

  //TODO: Make sure that image functionality/display is not adversely affected if localStorage is not suported
  if (typeof(Storage) !== "undefined") {
    //console.log('Local Storage supported'); // works
  } else {
    console.log('Local Storage no supported');
  }

  // Step 0. On page load, read local storage to see if a clicked items order exists and if so, set front-end img order to that saved order. Otherwise, use a default order.

  //console.log('test log');s

  // Step 1. We need to gather a list of the images that we need to handle
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

  // Step 2. Create click handler that takes img id and tracks when an <img> is clicked. Single clicks only for order. This should also maintain and save a count of clicks for each image

  // Step 3. When an img is click, thicken the border or make the image slightly smaller or darker
  // var clickHandler = function(imgID){
  // var clickHandler = function(){
  //   // $("#" + imgID).click(function(){
  //     //$("#" + id).attr('class', 'clicked');
  //     console.log('test' + imgID);
  //   // });
  // }

  // Bonus 1 . Add a small number bubble next to the image that was clicked, in the order that it's clicked

  // Step 4. Save order of clicked items to Local Storage

  // Step 5. Insert images into DOM
  for (var i = 0; i < imgArray.length; i++) {
    /*
    TODO: We need a way of breaking up the rows in such a way that there will always be rows of two no matter how many images are added. Here I'm working out what the commonalities and differences are to find a condition of i that can trigger the layout breaks.
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

    // var imgElem     = '<img id="' + imgID + '" src="' + imgArray[i] + '" alt="" class="img-responsive img-thumbnail center-block" onclick="clickHandler(' + imgID + ')"/>';
    var imgElem     = '<img id="' + imgID + '" src="' + imgArray[i] + '" alt="" class="img-responsive img-thumbnail center-block"/>';

    var colElemEnd  = '</div>';

    var rowElemEnd  = '</div>';

    // Step 3. When an img is clicked, thicken the border or make the image slightly smaller or darker
    // var clickHandler = function(imgID){
    // var clickHandler = function(){
    $("#" + imgID).click(function(){
         //$("#" + id).attr('class', 'clicked');
         console.log('test' + imgID);
       // });
    });


    // This is where we dictate whether a row break will happen or not and then we append the row item
    if( (i % 2) === 1 ){

      var imgColID    = "img_col_" + (i - 1);

      $("#" + imgColID).after(colElem + imgElem + colElemEnd + rowElemEnd);

    } else {

      $("#image-grid").append(rowElem + colElem + imgElem + colElemEnd);

    }
  }



  // Step 6. Create button logic to sort images by saved order

  // Step 7. Create button logic to sort images by stored click count

});
