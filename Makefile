install:
	npm ci
	
build:
	nx build
	
start: 
	nx serve
lint:	
	npx eslint .