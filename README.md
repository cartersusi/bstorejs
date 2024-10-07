## [Bstore](https://github.com/cartersusi/bstore)

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
const res = await Del('hentai/image.png', 'private');
console.log(res.status)
```

### Host

```html
<video src="http://localhost:8080/bstore/videos/video.mp4" controls class="max-w-full max-h-full"></video>
```

