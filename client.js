document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/videos')
    .then(response => response.json())
    .then(videos => {
      const videoGrid = document.getElementById('videoGrid');

      videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-container';
        videoElement.innerHTML = `
          <a href="video.html?path=${encodeURIComponent(video.path)}">
            <img src="${video.thumbnail}" alt="${video.name}" class="video-thumbnail">
          </a>
        `;
        videoGrid.appendChild(videoElement);
      });
    })
    .catch(error => console.error('Ошибка загрузки видео:', error));
});
