#!/bin/bash
echo "CD INTO MUSE"
cd lib/muse
echo "CONFIGURE"

if [ "$(uname)" == "Darwin" ]; then
    node-gyp configure --python /usr/bin/python3
    node-gyp build --python /usr/bin/python3
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    node-gyp configure 
    node-gyp build
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    node-gyp configure 
    node-gyp build
fi


if [ "$(uname)" == "Darwin" ]; then
    HOME=~/.electron-gyp node-gyp rebuild --target=30.0.1 --python /usr/bin/python3 --arch=x64 --dist-url=https://electronjs.org/headers
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    set HOME = C:\Users\Archie\.electron-gyp node-gyp rebuild --target=30.0.1  --arch=x64 --dist-url=https://electronjs.org/headers 
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    set HOME = C:\Users\Archie\.electron-gyp node-gyp rebuild --target=30.0.1  --arch=x64 --dist-url=https://electronjs.org/headers 
fi
