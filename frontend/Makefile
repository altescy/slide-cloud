DEST_NAME = dist
DIR = $(shell pwd)
DEST = $(DIR)/$(DEST_NAME)
NODE_MODULES = $(DIR)/node_modules
REVEALJS = $(NODE_MODULES)/reveal.js

all: build

clean:
	rm -rf $(NODE_MODULES)
	rm -rf $(DEST)

build:
	cd $(DIR); npm install && yarn build --dest $(DEST) && cp -R $(REVEALJS) $(DEST)

docker-build:
	docker run --rm -v $(DIR):/workdir -w /workdir node:alpine \
		sh -c "npm install && yarn build --dest $(DEST_NAME) && cp -R ./node_modules/reveal.js $(DEST_NAME)/reveal.js"
