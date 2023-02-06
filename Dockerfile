FROM httpd
WORKDIR /usr/local/apache2/htdocs
COPY ./index.js .
COPY ./client.js .