<div align="center">
  <img width="192px" height="auto" src="public/favicon.ico" alt="Bstore Logo">
  <h1>Bstore</h1>
  <p>A simple blob storage.</p>
</div>

<div align="center">

  [![bstore](https://img.shields.io/badge/go-bstore-00ADD8?style=flat-square&logo=go)](https://github.com/cartersusi/bstore)
  [![NPM Package](https://img.shields.io/badge/npm-bstorejs-red?style=flat-square&logo=npm)](https://www.npmjs.com/package/bstorejs)
  [![React Package](https://img.shields.io/badge/react-bstorejs--react-61DAFB?style=flat-square&logo=react)](https://www.npmjs.com/package/bstorejs-react)
  [![Demo](https://img.shields.io/badge/demo-bstorejs--demo-brightgreen?style=flat-square)](https://github.com/cartersusi/bstore-demo)

</div>

### Install
```sh
npm i bstorejs
```

### Import
```ts
import { put, get, list, del } from 'bstorejs';
```

### Usage

**Environment Variables**
```sh
export BSTORE_HOST="your_bstore_host" # e.g your `host` value from `conf.yml`
export BSTORE_READ_WRITE_KEY="your_read_write_key" # e.g the same `BSTORE_READ_WRITE_KEY` value from `keys.env`
```

**Accepted File/Blob Types**
- Bun
- Web
- Blob

```ts
/* Bun File https://bun.sh/docs/api/file-io */
const file = Bun.file("music.mp4");

/* Web File https://developer.mozilla.org/en-US/docs/Web/API/File */
const buffer = await fs.readFile("music.mp4");
const file = new File([buffer], "music.mp4");

/* Blob https://nodejs.org/api/buffer.html#class-blob */
const buffer = await fs.readFile("music.mp4");
const file = new Blob([buffer], { type: "video/mp4" });
```

1. Upload a File - `put`
```ts
const res = await put(file, 'videos/music.mp4', 'public');
console.log(res.url)
```

2. Download a File - `get`
```ts
const res = await get('videos/music.mp4', 'public');
const file = res.file as File;
await Bun.write('output/music.mp4', file);
```

3. Delete a File - `del`
```ts
const res = await del('hentai/image.png', 'private');
console.log(res.status)
```

4. Delete a Directory
- Must specify with `*` to prevent accidental deletes. 
```ts
const res = await del('tmp_data/*', 'public');
console.log(res.status)
```

1. List a Directory
```ts
const res = await list('images/', 'public');
console.log(res.files)
```

### Serving Public Files

```html
<img src="http://localhost:8080/bstore/image/image.mp4" class="max-w-full max-h-full object-contain"></img>
<embed src="http://localhost:8080/bstore/books/book.mp4" type="application/pdf" className="w-full h-full border-0"></embed>
```

### Steaming Public Videos
**Example Using a `.mp4` Video**
- Also Accepts: `.mp4`, `.webm`, `.ogg`, `.wmv`, `.mov`, `.avchd`, `.av1`

1. **Upload the `.mp4` Video**
```ts
const res = await put(file, 'music/song.mp4', 'public');
console.log(res.url)
```
```json
{
    "url": "http://localhost:8080/bstore/music/song.mp4",
    "message": "Public File Uploaded Successfully",
    "stream": {
        "hls_url": "http://localhost:8080/bstore/music/song/index.m3u8",
        "dash_url": "http://localhost:8080/bstore/music/song/index.mpd"
    }
}
```

2. **Serve the `.mp4`, `.mpd`, and `.m3u8` Files**
```html
<head>
  <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</head>
<body>
  <video id="videoPlayer" controls className="w-full h-full border-0">
    <source src="http://localhost:8080/bstore/music/song/index.m3u8" type="application/x-mpegURL">
    <source src="http://localhost:8080/bstore/music/song/index.mpd" type="application/dash+xml">
    <source src="http://localhost:8080/bstore/music/song.mp4" type="video/mp4">
  </video>
  <script>
    var video = document.querySelector("#videoPlayer");
    var dash_url = "http://localhost:8080/bstore/music/song/index.mpd";
    var hls_url = "http://localhost:8080/bstore/music/song/index.m3u8";

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(hls_url);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hls_url;
    } else if (dashjs.supportsMediaSource()) {
      var player = dashjs.MediaPlayer().create();
      player.initialize(video, dash_url, true);
    }
  </script>
</body>
```