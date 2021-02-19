#!/bin/sh

WORKING_FOLDER="temp-dist"
TARGET_GENERATOR=$1

rm -rf $WORKING_FOLDER
mkdir $WORKING_FOLDER
cd $WORKING_FOLDER

yarn init -y

cd "../packages/${TARGET_GENERATOR}"
rollup -c ../../../rollup.config.js

cd "../../../${WORKING_FOLDER}"
node "../packages/${TARGET_GENERATOR}/lib/bin"
