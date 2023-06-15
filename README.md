# Postgres + Express Sample App

![client-server-model](https://user-images.githubusercontent.com/119979671/214760820-ced2d4a6-edfe-42f7-904c-f1d87ac57e97.png)

## Pre-requisites

> If you have Postgres installed by other means, you can skip this section. You do not need Docker.

-   [Install Docker](https://docs.docker.com/get-docker/)

## Tech Stack

-   Node.js
-   Express.js
-   Postgres with pg (Wednesday)
-   Postgres with Sequelize ORM (Thursday)

## PSQL Commands

-   `psql -U postgres` - Connect to Postgres with user 'postgres'
-   `\l` - List all databases
-   `\c <database>` - Connect to a database
-   `\dt` - List all tables
-   `\d <table>` - List all columns in a table
-   `\q` - Quit

## Definitions

-   ORM - Object Relational Mapping
-   CRUD - Create, Read, Update, Delete

## Tips for initializing Database

-   If using Docker, start the container with `npm run start:db`

-   Connect to the Postgres container

```bash
psql -U postgres
```

-   Create a database

```sql
CREATE DATABASE "academy";
```

> Do not forget the semicolon at the end of the statement!!

## Helpful Node Commands for Linux

### Kill process running on port 3000

```bash
fuser -k 3000/tcp
```

### Open Port 3000 - CentOS Linux

```bash
firewall-cmd --add-port=3000/tcp
```

### Differences between Postgres and Sequelize

> Postgres has Tables and Rows

> Sequelize has Classes and Objects
