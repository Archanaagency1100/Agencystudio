document.addEventListener("DOMContentLoaded", function () {
    const track1 = document.getElementById('review-track-1');
    const track2 = document.getElementById('review-track-2');

    function duplicateMarqueeTrack(trackElement) {
        if (!trackElement) return;
        // Clone the inner HTML nodes cleanly to form a continuous chain
        const clonedContent = trackElement.innerHTML;
        trackElement.innerHTML = clonedContent + clonedContent;
    }

    duplicateMarqueeTrack(track1);
    duplicateMarqueeTrack(track2);
});