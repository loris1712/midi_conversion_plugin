import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var node_path = './mac/MuseClientSdk.node';
const MuseSdk = require(node_path);