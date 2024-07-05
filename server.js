const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware для парсинга JSON и URL-encoded данных
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Папки с видео и миниатюрами
const videoFolder = path.join(__dirname, 'videos');
const thumbnailFolder = path.join(__dirname, 'thumbnails');

// Роут для получения списка видео
app.get('/api/videos', (req, res) => {
  fs.readdir(videoFolder, (err, files) => {
    if (err) {
      console.error('Ошибка чтения директории с видео:', err);
      res.status(500).json({ error: 'Ошибка чтения директории с видео' });
    } else {
      const videoList = files.map(file => ({
        name: file,
        path: `/videos/${file}`,
        thumbnail: `/thumbnails/${file.replace(/\.[^/.]+$/, '')}.jpg`
      }));
      res.json(videoList);
    }
  });
});

// Предоставление доступа к статическим файлам (CSS, изображения, видео)
app.use(express.static(path.join(__dirname)));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
