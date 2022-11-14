FROM node:16-alpine as builder

ARG handler=weasyprint

# weasyprint
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

# wkhtmltopdf
RUN apk add --update --no-cache \
    libgcc libstdc++ libx11 glib libxrender libxext libintl \
    ttf-dejavu ttf-droid ttf-freefont ttf-liberation

# On alpine static compiled patched qt headless wkhtmltopdf (46.8 MB).
COPY --from=madnight/alpine-wkhtmltopdf-builder:0.12.5-alpine3.10-606718795 \
    /bin/wkhtmltopdf /bin/wkhtmltopdf
RUN [ "$(sha256sum /bin/wkhtmltopdf | awk '{ print $1 }')" \
        == "06139f13500db9b0b4373d40ff0faf046e536695fa836e92f41d829696d6859f" ]

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

CMD npm start
