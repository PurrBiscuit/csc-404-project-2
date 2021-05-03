# CSC-404 - Internship Qualifier

## Overview

A simple express application to allow for a user to input grade information for a student and display qualifying students based on partial GPA.

## Development

Enter `npm install` to install all dependencies before proceeding to the subsections below.

The examples listed below are ways to run the application on your host machine directly.  It's recommended to use Docker to run this locally however since the configurations are all in place for it already and it makes for a repeatable, predictable development environment.  Please see the [Docker Instructions](#docker) for ways to run this application through our Docker configurations.

### Running Program

Enter the `MONGODB_URL=<url_to_mongodb> npm run start` command to start the program itself.  This will start the express server locally on port 3000 - visit http://localhost:3000 to access the app.

### Running Test Suite

Enter the `MONGODB_TEST_URL=<url_to_mongodb> npm run test` command to run the test suite.  Running it this way will require you to have `mongo` running on your local machine already or have an instance of it running remotely that's accessibly from your host machine.  It's also recommended to run the test suite using the Docker commands below whenever possible.

### Running Linter

Enter the `npm run lint` command to run the linter.  The linter helps to enforce our convention throughout the code base.  The rules for this convention are defined in the `.eslintrc.json` file.

### Docker

If you want to run any of the commands with docker instead of locally, you can do so with the following steps:

#### Run App

**The `docker compose` commands below require [Docker Desktop version 3.0.0](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-300) or greater to work**

1. Start up the docker containers with `docker compose up`.
2. Navigate to http://localhost:3000 to see the running internship qualifier application.
3. Navigate to http://localhost:8081 to see an admin console for the running `mongo` container.

#### Connecting into `mongo` container

**The `docker compose exec` command is available in [Docker Desktop versions 3.2.0](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-320) or greater**

After the containers have been started successfully with `docker compose up`, you can enter into the `mongo` container directly.  If you wanted to get into the `mongo` container and run the `mongo` command line you can use:

`docker compose exec mongo mongo`

Once you are in the container and running the `mongo` command line you can enter normal `mongo` commands like `show dbs`, `use <db_name`, `show collections`, etc.

#### Run Test Suite

1. Start up the docker containers using a different command for the test suite `docker compose run --rm app npm run test`.

#### Run Linter

1. Start up the docker containers using a different command for the linter `docker compose run --rm app npm run lint`.

### Mongo

The internship qualifier application uses [mongodb](https://www.mongodb.com/2) as its data store.

#### Useful `mongo` CLI commands

Listed below are some helpful `mongo` CLI commands that can be used after `exec`ing into the `mongo` container or connecting remotely to your mongodb instance.

- `show dbs` - show all dbs.
- `use dbName` - connect to a database by name. (ie. `use students_db`)
- `db.collectionName.find()` - return the first 20 records from that collection in the database you're currently connected to. (ie. `db.students.find()`)
