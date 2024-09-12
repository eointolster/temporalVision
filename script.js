// script.js

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('video-slider');
    const sliderHandle = document.querySelector('.slider-handle');
    const videoAfter = document.querySelector('.video-after');
    const videoBefore = document.querySelector('.video-before');
    const playPauseButton = document.getElementById('play-pause');
    const resetButton = document.getElementById('reset');

    let isDragging = false;

    // Function to update slider position
    function updateSliderPosition(position) {
        const percentage = (position / slider.offsetWidth) * 100;
        videoAfter.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        sliderHandle.style.left = `${percentage}%`;
    }

    // Event listener for slider input
    slider.addEventListener('input', (e) => {
        updateSliderPosition(e.target.value * slider.offsetWidth / 100);
    });

    // Mouse events for dragging
    slider.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = slider.getBoundingClientRect();
            const position = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            updateSliderPosition(position);
        }
    });

    // Touch events for mobile devices
    slider.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const rect = slider.getBoundingClientRect();
            const touch = e.touches[0];
            const position = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
            updateSliderPosition(position);
        }
    });

    // Play/Pause functionality
    playPauseButton.addEventListener('click', () => {
        if (videoBefore.paused) {
            videoBefore.play();
            videoAfter.play();
            playPauseButton.textContent = 'Pause';
        } else {
            videoBefore.pause();
            videoAfter.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    // Reset functionality
    resetButton.addEventListener('click', () => {
        videoBefore.currentTime = 0;
        videoAfter.currentTime = 0;
        updateSliderPosition(slider.offsetWidth / 2);
    });

    // Ensure videos stay in sync
    videoBefore.addEventListener('timeupdate', () => {
        if (Math.abs(videoBefore.currentTime - videoAfter.currentTime) > 0.5) {
            videoAfter.currentTime = videoBefore.currentTime;
        }
    });

    // Initial setup
    updateSliderPosition(slider.offsetWidth / 2);
    videoBefore.play();
    videoAfter.play();
});