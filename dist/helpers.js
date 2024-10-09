//let environment: 'web' | 'bun' | 'deno' | 'node' = 'web';
let environment = 'web';
if (environment === 'web' && typeof process !== 'undefined') {
    environment = 'node';
}
const BStoreRWKey = [
    process.env.BSTORE_READ_WRITE_KEY,
    process.env.BSTORE_READ_KEY,
    process.env.BSTORE_WRITE_KEY,
    process.env.PRIVATE_BSTORE_READ_WRITE_KEY,
    process.env.BSTORE_PRIVATE_READ_WRITE_KEY,
].find(key => key !== undefined) || '';
const BstoreHost = [
    process.env.PUBLIC_BSTORE_HOST,
    process.env.BSTORE_HOST,
    process.env.NEXT_PUBLIC_BSTORE_HOST,
    process.env.VITE_BSTORE_HOST,
    process.env.REACT_APP_BSTORE_HOST,
].find(key => key !== undefined) || 'http://localhost:8080';
export function getBstoreHost() {
    if (BstoreHost) {
        return BstoreHost;
    }
    throw new Error('BStore Host not set. Valid keys are PUBLIC_BSTORE_HOST, BSTORE_HOST, NEXT_PUBLIC_BSTORE_HOST, VITE_BSTORE_HOST, REACT_APP_BSTORE_HOST');
}
export function getBstoreRWKey() {
    if (BStoreRWKey) {
        return BStoreRWKey;
    }
    throw new Error('BStore RW Key not set. Valid keys are BSTORE_READ_WRITE_KEY, BSTORE_READ_KEY, BSTORE_WRITE_KEY, PRIVATE_BSTORE_READ_WRITE_KEY, BSTORE_PRIVATE_READ_WRITE_KEY');
}
