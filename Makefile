ci: npm.install npm.lint tests.unit bundler.install up waitforprintit tests.integration

deps: npm.install bundler.install

npm.install:
	@npm install

npm.lint:
	@npm install

bundler.install:
	@bundle install

waitforprintit:
	@sleep 10

up:
	@docker-compose up -d --force-recreate --build

%.up:
	@docker-compose up -d --force-recreate --build $*

down:
	@docker-compose down

ps:
	@docker-compose ps

%.logs:
	@docker-compose logs -f $*

tests.unit:
	@npm run test

tests.unit.watch:
	@npm run test:watch

tests.integration:
	@bundle exec webspicy formaldoc

tests.integration.watch:
	@bundle exec webspicy formaldoc -w
