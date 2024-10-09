<div align="center">
  <img width="192px" height="auto" src="public/favicon.ico" alt="Bstore Logo">
  <h1>Bstore</h1>
  <p>A simple blob storage.</p>
</div>

<div align="center">

  [![Go Package](https://img.shields.io/badge/go%20package-bstore-00ADD8?style=flat-square&logo=go)](https://github.com/carterusi/bstore)
  [![NPM Package](https://img.shields.io/badge/npm-bstorejs-red?style=flat-square&logo=npm)](https://www.npmjs.com/package/bstorejs)
  [![React Package](https://img.shields.io/badge/react-bstorejs--react-61DAFB?style=flat-square&logo=react)](https://www.npmjs.com/package/bstorejs-react)
  [![Demo](https://img.shields.io/badge/demo-bstorejs--demo-brightgreen?style=flat-square)](https://github.com/carterusi/bstorejs-demo)

</div>

### Install
```sh
npm i bstorejs
```

### Import
```ts
import { put, get, list, del } from 'bstorejs';
```

### Functions

```ts
// Upload a File
const file = Bun.file(music.mp4);
const res = await put('videos/music.mp4', 'public', file);

// Download a File
const res = await get('videos/music.mp4', 'public');
const file = res.file as File;
await Bun.write('output/music.mp4', file);


// Delete a File
const res = await del('hentai/image.png', 'private');
console.log(res.status)
```

### Host

```html
<video src="http://localhost:8080/bstore/videos/video.mp4" controls class="max-w-full max-h-full"></video>
```

