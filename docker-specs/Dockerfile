ARG WPP_DOCKER_HUB_PROXY_TAG_PREFIX
FROM ${WPP_DOCKER_HUB_PROXY_TAG_PREFIX:-}nginx:stable-alpine

COPY docker-specs/nginx_default.conf /etc/nginx/templates/default.conf.template
COPY docker-specs/proxy.conf /etc/nginx/proxy.conf
COPY packages/components-library/storybook-static /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
