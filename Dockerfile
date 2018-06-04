#  Use an official node runtime image as a build stage
FROM node:alpine as builder

LABEL maintainer="Morgan Cocherel <morgan@gmail.com>"

# Set the working directory to /tmp
WORKDIR /tmp

# Copy and past the all project. Have a look at .dockerignore
COPY . .

# Install any needed packages
RUN npm i -g npm@latest \
    && npm i
RUN npm run build

#  run stage
FROM nginx:alpine

# Copy dist content into nginx
COPY --from=builder /tmp/dist /usr/share/nginx/html
COPY nginx-shooter.conf /etc/nginx/conf.d/default.conf