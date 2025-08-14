// Select the rectangle element by its ID
var rect = document.getElementById("rec");

// Listen for mouse movement anywhere in the window
window.addEventListener("mousemove", function (details) {
  
  // Get the current width of the rectangle in pixels
  var recWidth = rect.getBoundingClientRect().width;

  /* 
    Map the mouse's X position (0 → full window width) 
    to a constrained range for the rectangle's "left" position.
    
    This ensures:
    - The rectangle stays within visible bounds
    - 70px padding is maintained on each side
    - The mapping accounts for the rectangle's own width
  */
  var range = gsap.utils.mapRange(
    0,                                     // Mouse at far left
    window.innerWidth,                     // Mouse at far right
    70 + recWidth / 2,                      // Minimum left position
    window.innerWidth - (70 + recWidth / 2),// Maximum left position
    details.clientX                         // Current mouse X position
  );

  // Animate the rectangle's horizontal position smoothly using GSAP
  gsap.to("#rec", {
    left: range + "px",   // New computed left position in pixels
    ease: Power3,         // Easing for smooth motion
  });
});
