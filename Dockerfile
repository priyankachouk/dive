#FROM ubuntu:14.04
#
#RUN apt-get update -y
#
## Install packages
#RUN apt-get install -y curl
#RUN apt-get install -y postgresql
#RUN apt-get install -y postgresql-client
#
## Remove apt cache to make the image smaller
#RUN rm -rf /var/lib/apt/lists/*
#
#CMD bash


FROM ubuntu:14.04

RUN apt-get update -y && \
    apt-get install -y curl postgresql postgresql-client && \
    rm -rf /var/lib/apt/lists/*

CMD bash
