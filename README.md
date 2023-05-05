# Trufi server storage

## API Documentation

Documentation created with Swagger and Docker.

### File

```
/api-documentation/trufi/store.yaml
```

### How to Run

Enter in api-documentation folder
```
cd api-documentation
```

Run docker container
```
docker compose up -d
```

## How add Nginx config to your server

To copy the Nginx configuration, you need to locate the 'nginx.conf' file in the server's configuration directory. Once you've found it, open the file and locate the section of configuration that you want to copy. This section may contain directives like 'server', 'location', or 'proxy_pass'.

After selecting the configuration section you want to copy, you can paste it into your own Nginx configuration file. To keep things organized, it's a good practice to place your copied configuration after the '#extension' keyword in your configuration file. This will make it easier to find and manage your custom configurations in the future.

```
location /user_feedback/ {
    proxy_pass http://user_feedback:3000/;
}
```