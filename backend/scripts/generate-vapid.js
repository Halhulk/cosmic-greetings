// Generate a new pair of VAPID keys for Web Push
// Usage: node generate-vapid.js

const webpush = require('web-push');

const keys = webpush.generateVAPIDKeys();
console.log('VAPID_PUBLIC=' + keys.publicKey);
console.log('VAPID_PRIVATE=' + keys.privateKey);