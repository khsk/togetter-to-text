#!/bin/sh 

set -eu

zstd -D /chrome/chromium_lib.dict -d /chrome/chromium_lib.tar.zst
#rm /chrome/chromium_lib.dict
tar xvf /chrome/chromium_lib.tar
#rm /chrome/chromium_lib.tar
mv chromium /usr/lib/chromium
ln -s /usr/lib/chromium/chromium-launcher.sh /usr/bin/chromium-browser
node express.js
#node server-test.js
