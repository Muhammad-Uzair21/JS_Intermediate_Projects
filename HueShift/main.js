// Get a reference to the element we want to color on hover
const rect = document.getElementById("center");

// Listen for mouse movement *inside* the element to update color continuously
rect.addEventListener('mousemove', function(details){
    // Get element's size and position relative to the viewport
    var rectLocation = rect.getBoundingClientRect();

    // Horizontal mouse position measured from the element's left edge (0 = far left)
    var mouseLocation = details.clientX - rectLocation.left;

    // If the pointer is on the left half of the element...
    if (mouseLocation < rectLocation.width / 2){
        // Map [0 → width/2] to a red intensity [255 → 0]
        // (full red at the far left, fading to 0 at the center)
        var redColor = gsap.utils.mapRange(0, rectLocation.width / 2, 255, 0, mouseLocation);

        // Animate the background to the computed red value (green/blue fixed at 0)
        gsap.to(rect, {
            backgroundColor : `rgb(${redColor}, 0, 0)`,
            // Easing function for a smoother transition (GSAP)
            // Note: in GSAP 3, prefer "power4.out"
            ease: Power4,
        })
    } else {
        // Otherwise, pointer is on the right half of the element...
        // Map [width/2 → width] to a blue intensity [0 → 255]
        // (0 at center, increasing to full blue at the far right)
        var blueColor = gsap.utils.mapRange(rectLocation.width/2, rectLocation.width, 0, 255, mouseLocation );

        // Animate the background to the computed blue value (red/green fixed at 0)
        gsap.to(rect, {
            backgroundColor : `rgb(0, 0, ${blueColor})`,
            // Easing function for a smoother transition (GSAP)
            // Note: in GSAP 3, prefer "power4.out"
            ease: Power4,
        })
    }
})

// When the mouse leaves the element, fade the background back to white
rect.addEventListener('mouseleave', function(){
    gsap.to(rect, {
        backgroundColor : 'white',
        // Easing for a smooth return to the default color
        ease: Power4,
    })
})
