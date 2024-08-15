#!/bin/bash
echo "CD INTO MUSE"
cd lib/muse
echo "REMOVE OLD BUILD"
rm -rf build
echo "CONFIGURE"
node-gyp configure
echo "BUILD"
node-gyp build

if [ "$(uname)" == "Darwin" ]; then
    HOME=~/.electron-gyp node-gyp rebuild --target=30.0.1  --arch=x64 --dist-url=https://electronjs.org/headers
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    set HOME = C:\Users\Archie\.electron-gyp node-gyp rebuild --target=30.0.1  --arch=x64 --dist-url=https://electronjs.org/headers 
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    set HOME = C:\Users\Archie\.electron-gyp node-gyp rebuild --target=30.0.1  --arch=x64 --dist-url=https://electronjs.org/headers 
fi
