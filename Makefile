all: build

node_modules:
	npm install

bower:
	rm -Rf bower_components/
	bower install

build: node_modules bower
	gulp clean
	gulp build

.PHONY: bower
.PHONY: build
