SHELL := /bin/bash

api-start:
	cd api && source env/bin/activate && uvicorn main:app

front-start:
	npm -C front run start
