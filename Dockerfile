FROM node:16-alpine as builder

ARG handler=weasyprint

RUN apk add \
  py3-pip \
  py3-pillow \
  py3-cffi \
  py3-brotli \
  gcc \
  musl-dev \
  python3-dev \
  pango \
  fontconfig \
  ttf-freefont \
  font-noto \
  terminus-font \
&& \
  fc-cache -f \
&& \
  fc-list | sort
RUN pip install weasyprint && weasyprint --info

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

CMD npm start
