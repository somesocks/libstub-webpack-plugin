
.PHONY: help build test

help:

build:
	rsync --update --recursive --delete ./src/ ./dist

test:
	NODE_PATH=. webpack --config=./test/webpack.js
