 // Array of photo URLs with names and likes
 const photos = [
    { name: "Photo 1", url: "photos/me.jpg", likes: 0 },
    { name: "Photo 2", url: "photos/me2.jpg", likes: 0 },
    { name: "Photo 3", url: "photos/me3.jpg", likes: 0 }
    { name: "Photo 3", url: "photos/marek.jpg", likes: 0 }
];

let currentIndex = 0;

function showCurrentPhoto() {
    const photoCard = document.getElementById('photoCard');

    // If there are no more photos to show
    if (currentIndex >= photos.length) {
        photoCard.innerHTML = "<p style='text-align:center;'>You have swiped through all photos!</p>"; // Show catchup message
        return; // Exit the function
    }

    // Display current photo
    const img = new Image(); // Create a new image element
    img.src = photos[currentIndex].url; // Set the source to the image URL
    img.alt = photos[currentIndex].name; // Alternative text
    img.onload = () => {
        photoCard.innerHTML = ''; // Clear previous images
        photoCard.appendChild(img); // Append the new image
        photoCard.style.transform = 'translate(0, 0)'; // Reset position
        photoCard.style.opacity = 1; // Reset opacity
    };
}

// Show the first photo
showCurrentPhoto();

// Like and Next Button Functionality
function likePhoto() {
    if (currentIndex < photos.length) {
        photos[currentIndex].likes++; // Increment likes for the current photo
        document.getElementById(`likes${currentIndex + 1}`).innerText = photos[currentIndex].likes; // Update likes count
        swipe('left'); // Simulate a left swipe after liking
    }
}

function nextPhoto() {
    if (currentIndex < photos.length) {
        swipe('right'); // Simulate a right swipe
    }
}

// Swipe functionality
function swipe(direction) {
    const photoCard = document.getElementById('photoCard');
    const swipeLeft = document.getElementById('swipeLeft');
    const swipeRight = document.getElementById('swipeRight');

    if (direction === 'left') {
        swipeLeft.style.opacity = 1; // Show left swipe indicator
        swipeRight.style.opacity = 0; // Hide right swipe indicator
        photoCard.style.transform = 'translate(-150%, -50%)'; // Swipe out left
        photoCard.style.opacity = 0.5; // Make it semi-transparent
    } else {
        swipeRight.style.opacity = 1; // Show right swipe indicator
        swipeLeft.style.opacity = 0; // Hide left swipe indicator
        photoCard.style.transform = 'translate(150%, -50%)'; // Swipe out right
        photoCard.style.opacity = 0.5; // Make it semi-transparent
    }

    // Update the current index after a brief delay
    setTimeout(() => {
        currentIndex++;
        showCurrentPhoto(); // Show next photo
        swipeLeft.style.opacity = 0; // Hide left swipe indicator
        swipeRight.style.opacity = 0; // Hide right swipe indicator
    }, 400); // Match the duration of the CSS transition
}

// Attach button event listeners
document.getElementById('likeButton').addEventListener('click', likePhoto);
document.getElementById('nextButton').addEventListener('click', nextPhoto);

// Handle touch events for swiping
const photoContainer = document.querySelector('.photo-container');

let startX;

photoContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Get initial touch position
});

photoContainer.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX; // Get current touch position
    const diffX = currentX - startX; // Calculate difference

    photoCard.style.transform = `translate(${diffX}px, -50%)`; // Move the card
    photoCard.style.opacity = 1 - Math.abs(diffX) / 300; // Adjust opacity based on swipe distance
});

photoContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX; // Get end touch position
    const diffX = endX - startX; // Calculate final difference

    // Determine if it's a valid swipe
    if (Math.abs(diffX) > 50) {
        swipe(diffX > 0 ? 'right' : 'left'); // Swipe left or right based on direction
    } else {
        showCurrentPhoto(); // Reset to current photo if swipe is not valid
    }
});
