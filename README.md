## [Bstorejs](https://github.com/cartersusi/bstore)

* `@bstorejs/bstore` - Express/Vanilla Js/Ts
* `@bstorejs/react` - React/Nextjs Js/Ts (Server Actions)

### Keys
```ts
export const BstoreHost = [
    process.env.PUBLIC_BSTORE_HOST,
    process.env.NEXT_PUBLIC_BSTORE_HOST,
    process.env.REACT_APP_BSTORE_HOST,
].find(key => key !== undefined) || '';

const BStoreRWKey = [
  process.env.BSTORE_READ_WRITE_KEY,
  process.env.PRIVATE_BSTORE_READ_WRITE_KEY,
  process.env.BSTORE_PRIVATE_READ_WRITE_KEY,
].find(key => key !== undefined) || '';
```