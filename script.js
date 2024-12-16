// for squeezed toolbar on small windows
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    toggleButton.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});



// progress bar
function updateProgressBar() {
    const scrollProgress = document.getElementById('progress-bar');
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;

    scrollProgress.style.width = scrollPercentage + '%';
}

// Event listener for scrolling
document.addEventListener('scroll', updateProgressBar);