Slide Cloud
===

Slide Cloud is Markdown slide editor on Web browser.
You can write / save / share your slides.


### Deploy

Following are instructions for deploying Slide Cloud serve:


1. Build front-end application

```
$ cd ./frontend
$ make
```

  It will create a directory `./frontend/dist` which contains built application.

  This directory is mounted into a docker image by a following instruction.


2. Start up Slide Cloud server

```
$ docker-compose up -d
```

3. access `http://localhost/`