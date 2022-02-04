SelfRemind - a selfhosted To-do List Manager built with [Next.js](https://nextjs.org/), [Chakra-UI](https://chakra-ui.com/) and [MySQL](https://www.mysql.com/).

## Getting Started with `docker-compose`

To start with, you must install [Docker](https://www.docker.com/products/docker-desktop) and [docker-compose](https://docs.docker.com/compose/) on your computer.

First, create a `docker-compose.yml` file with the following content:

```yml
version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
  db:
    image: mysql/mysql-server:8.0
    restart: unless-stopped
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: selfremind
      MYSQL_USER: selfremind
      MYSQL_PASSWORD: selfremind123
    volumes:
      - dbdata:/var/lib/mysql
      - ./my.conf:/etc/mysql/my.cnf
volumes:
  dbdata:
```

Then, run the command to start the server:
```bash
docker-compose up -d
```

Wait a minutes and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

By default, the username is `admin` and the password is `admin`.

## Learn More

This is a side project built by [Jacky Fan](https://github.com/redfrogsss) - a university student in HK. 

The following tech is used in this project.
- [Next.js](https://nextjs.org/) - the frontend and backend framework of this project.
- [Chakra-UI](https://chakra-ui.com/) - the UI solutions of this project.
- [MySQL](https://www.mysql.com/) - the database of this project.

You can check out [my dirty code in Github](https://github.com/redfrogsss/selfremind) - your feedback are welcome!