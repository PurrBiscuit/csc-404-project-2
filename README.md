# CSC-404 - Internship Qualifier

## Overview

A simple express application to allow for a user to input grade information for a student and display qualifying students based on partial GPA.

## Development

Enter `npm install` to install all dependencies before proceeding to the subsections below.

### Running Program

Enter the `npm run start` command to start the program itself.  This will start the express server locally on port 3000 - visit http://localhost:3000 to access the app.

### Running Test Suite

Enter the `npm run test` command to run the test suite.

### Running Linter

Enter the `npm run lint` command to run the linter.  The linter helps to enforce our convention throughout the code base.  The rules for this convention are defined in the `.eslintrc.json` file.

### Docker

If you want to run any of the commands with docker instead of locally, you can do so with the following steps:

#### Run App

**The `docker compose` commands below require [Docker Desktop version 3.0.0](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-300) or greater to work**

1. Start up the docker containers with `docker compose up`.
2. Navigate to http://localhost:3000 to see the running internship qualifier application.
3. Navigate to http://localhost:8081 to see an admin console for the running `mongo` container.

##### Connecting into `mongo` container

**The `docker compose exec` command is available in [Docker Desktop versions 3.2.0](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-320) or greater**

After the containers have been started successfully with `docker compose up`, you can enter into the `mongo` container directly.  If you wanted to get into the `mongo` container and run the `mongo` command line you can use:

`docker compose exec mongo mongo`

Once you are in the container and running the `mongo` command line you can enter normal `mongo` commands like `show dbs`, `use <db_name`, `show collections`, etc.

#### Run Test Suite

1. Start up the docker containers using a different command for the test suite `docker compose run --rm app npm run test`.

#### Run Linter

1. Start up the docker containers using a different command for the linter `docker compose run --rm app npm run lint`.
