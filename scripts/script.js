 // $(function() {

 //   var setInvisible = function(elem) {
 //     elem.css('visibility', 'hidden');
 //   };
 //   var setVisible = function(elem) {
 //     elem.css('visibility', 'visible');
 //   };

 //   var products = $(".product-list");
 //   var items = products.children();

 //   // Inserting Buttons
 //   products.prepend('<div id="right-button" style="visibility: hidden;"><a href="#"><</a></div>');
 //   products.append('  <div id="left-button"><a href="#">></a></div>');

 //   // Inserting Inner
 //   items.wrapAll('<div id="inner" />');

 //   // Inserting Outer
 //   debugger;
 //   elem.find('#inner').wrap('<div id="outer"/>');

 //   var outer = $('#outer');

 //   var updateUI = function() {
 //     var maxWidth = outer.outerWidth(true);
 //     var actualWidth = 0;
 //     $.each($('#inner >'), function(i, item) {
 //       actualWidth += $(item).outerWidth(true);
 //     });

 //     if (actualWidth <= maxWidth) {
 //       setVisible($('#left-button'));
 //     }
 //   };
 //   updateUI();



 //   $('#right-button').click(function() {
 //     var leftPos = outer.scrollLeft();
 //     outer.animate({
 //       scrollLeft: leftPos - 200
 //     }, 800, function() {
 //       debugger;
 //       if ($('#outer').scrollLeft() <= 0) {
 //         setInvisible($('#right-button'));
 //       }
 //     });
 //   });

 //   $('#left-button').click(function() {
 //     setVisible($('#right-button'));
 //     var leftPos = outer.scrollLeft();
 //     outer.animate({
 //       scrollLeft: leftPos + 200
 //     }, 800);
 //   });

 //   $(window).resize(function() {
 //     updateUI();
 //   });
 // });


$(document).ready(function() {
  // if sum of width of products is greater than width of box
  //    add left scroller
  var test = function(msg) {
    alert(msg);
  };

  test('What's happening);

})
