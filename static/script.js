// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select all the words in the welcome overlay
    const words = document.querySelectorAll('.word');

    // Set each word's animation delay dynamically
    words.forEach((word, index) => {
        word.style.setProperty('--word-index', index);
    });

    // After the animation finishes (about 4 seconds), fade out the welcome overlay and show the main content
    setTimeout(function () {
        document.querySelector('.welcome-overlay').classList.add('fade-out');
        document.querySelector('.hero').style.display = 'block'; // Show the main content
    }, 4000); // Timing matches the fade-in duration
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function askGemini() {
    const query = document.getElementById("userQuery").value;
    const responseDiv = document.getElementById("response");

    responseDiv.innerText = "Loading...";
    
    const response = await fetch("/ask_gemini", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    responseDiv.innerText = data.response || "Error: " + data.error;
}


