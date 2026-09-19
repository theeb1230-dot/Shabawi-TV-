const player = document.getElementById('player');
const videoLinks = {
    ep1: 'video1.mp4',
    ep2: 'video2.mp4'
};
const hash = window.location.hash.replace('#', '');
if (videoLinks[hash]) {
    player.src = videoLinks[hash];
}
