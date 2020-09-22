Slide Cloud
===

Slide Cloud is Markdown slide editor on Web browser.
You can write / save / share your slides.

![screenshot](https://user-images.githubusercontent.com/16734471/93876041-18c42300-fd11-11ea-80bd-94b3ff2acf3e.png)


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
