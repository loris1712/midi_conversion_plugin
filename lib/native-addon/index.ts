import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nativeAddon = require("../lib/native-addon/build/Release/native.node");

// @ts-ignore
nativeAddon.dummyFunction();
// @ts-ignore
nativeAddon.calculateSum();
// @ts-ignore
nativeAddon.processString();
// @ts-ignore
nativeAddon.vectorOperations();
