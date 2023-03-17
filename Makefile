CC=pnpm

default: fmt
	$(CC) dev

dep:
	$(CC) install

fmt:
	npx prettier --write .

clean:
	@rm -rf node_modules

check:
	$(CC) test

build:
	$(CC) build
