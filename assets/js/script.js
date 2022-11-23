// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var dayJsObject = dayjs();
  var clickSave = $(".btn").click(function() {
    var blockID = $(this).parent().attr('id');
    var userData = $(this).siblings('.description').val();

    localStorage.setItem(blockID, userData);
    userData = "";

  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var displayEl = dayJsObject.format("dddd, MMMM DD,YYYY");
  var currentDayEl = $("#currentDay");
  var currentHour = dayJsObject.format("H");
  var getRow = $(".hour");
  var getRowClass = getRow.parent();

  if (currentHour < 9){
    getRowClass.removeClass("present past");
    getRowClass.addClass("future");
  } else if (currentHour > 17){
    getRowClass.removeClass("present future");
    getRowClass.addClass("past");
  } else {
    for (var i = 0; i < getRow.length; i++){
      var rowHour = parseInt(getRow[i].dataset.time);
      if (rowHour === currentHour){
        getRowClass.eq(i).removeClass("past present future");
        getRowClass.eq(i).addClass("present");
      } else if (rowHour < currentHour){
        getRowClass.eq(i).removeClass("past present future");
        getRowClass.eq(i).addClass("past");
      } else if (rowHour > currentHour){
        getRowClass.eq(i).removeClass("past present future");
        getRowClass.eq(i).addClass("future");
      }
    };
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  currentDayEl.text(displayEl);

});