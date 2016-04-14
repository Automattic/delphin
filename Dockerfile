FROM    debian:wheezy

RUN     apt-get update

MAINTAINER Automattic

WORKDIR /delphin

RUN     mkdir -p /tmp
RUN     apt-get -y update && apt-get -y install \
          wget \
          git \
          python \
          make \
          build-essential

ENV NODE_VERSION 4.3.0

RUN     wget https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz && \
          tar -zxf node-v$NODE_VERSION-linux-x64.tar.gz -C /usr/local && \
          ln -sf /usr/local/node-v$NODE_VERSION-linux-x64 /usr/local/node && \
          ln -sf /usr/local/node/bin/npm /usr/local/bin/ && \
          ln -sf /usr/local/node/bin/node /usr/local/bin/ && \
          rm node-v$NODE_VERSION-linux-x64.tar.gz

ENV     NODE_PATH /delphin/server:/calypso/client:/delphin/app

# Install base npm packages to take advantage of the docker cache
COPY    ./package.json /delphin/package.json

# Sometimes "npm install" fails the first time when the cache is empty, so we retry once if it failed
RUN     npm install --production || npm install --production
RUN     npm run build

COPY    . /delphin

# Build javascript bundles for each environment and change ownership
RUN     npm build && \
          chown -R nobody /delphin

USER    nobody
CMD     npm run prod
