# pull official python image
FROM python:3.6

# set environment var
ENV PYTHONUNBUFFERED 1

# create and set work directory
RUN mkdir /code
WORKDIR /code

# install dependencies
COPY requirements.txt /code/
RUN pip install -r requirements.txt

# copy project
COPY . /code/