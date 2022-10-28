## Continuous integration & tests

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

## Docker images

DOCKER_TAG := $(or ${DOCKER_TAG},${DOCKER_TAG},latest)
DOCKER_REGISTRY := $(or ${DOCKER_REGISTRY},${DOCKER_REGISTRY},docker.io)

CONTAINER_NAME = printit
IMG_NAME = enspirit/printit

TINY = ${DOCKER_TAG}
MINOR = $(shell echo '${TINY}' | cut -f'1-2' -d'.')
MAJOR = $(shell echo '${MINOR}' | cut -f'1' -d'.')

weasyprint.image.latest:
	docker build --build-arg handler="weasyprint" . -t $(IMG_NAME):weasyprint-latest

weasyprint.image.push: weasyprint.image.latest
	docker push $(DOCKER_REGISTRY)/$(IMG_NAME):weasyprint-latest

weasyprint.image.tag: weasyprint.image.latest
	docker tag $(IMG_NAME):weasyprint-latest $(IMG_NAME):weasyprint-$(TINY)
	docker tag $(IMG_NAME):weasyprint-latest $(IMG_NAME):weasyprint-$(MINOR)
	docker tag $(IMG_NAME):weasyprint-latest $(IMG_NAME):weasyprint-$(MAJOR)

weasyprint.image.tag.push: weasyprint.image.tag
	docker push ${DOCKER_REGISTRY}/$(IMG_NAME):weasyprint-$(TINY)
	docker push ${DOCKER_REGISTRY}/$(IMG_NAME):weasyprint-$(MINOR)
	docker push ${DOCKER_REGISTRY}/$(IMG_NAME):weasyprint-$(MAJOR)
