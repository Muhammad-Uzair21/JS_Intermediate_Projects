// Throttle function to limit how often an event callback executes
// Prevents performance issues when handling frequent events like mousemove
function throttle(fn, delay) {
    let lastTime = 0;
    return function (...args) {
        let now = Date.now();
        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// Listen for mouse movement on the #main element
document.querySelector('#main').addEventListener('mousemove', throttle((e) => {

    // Create a container div and image element for the hover effect
    const div = document.createElement("div");
    const img = document.createElement("img");

    // Set the image source (Unsplash image link)
    img.setAttribute("src", "https://images.unsplash.com/photo-1754920888466-37fc88567012?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0");

    // Apply class for styling (defined in CSS)
    div.classList.add("imageDiv");

    // Append the elements to the DOM
    document.body.appendChild(div);
    div.appendChild(img);

    // Position the div at the current cursor coordinates
    div.style.left = e.clientX + "px";
    div.style.top = e.clientY + "px";

    // Create a GSAP timeline for smooth entry and exit animation
    gsap.timeline({
        // Remove the div after animation finishes
        onComplete: () => div.remove()
    })
    // Step 1: Image starts below (y: 100%) and slides up to y: 0%
    .fromTo(img, 
        { y: "100%" },                // Start position
        { y: "0%", ease: "power1.out", duration: 0.3 } // Slide up animation
    )
    // Step 2: Image slides back down (y: 100%) after a short delay
    .to(img, 
        { y: "100%", ease: "power2.in", duration: 0.3, delay: 0.2 }
    );

}, 250)); // Throttle to run at most once every 250ms
