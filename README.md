# SteamBot
- A steam bot, with database connection made with NodeJs.

## Configuration.

- `src/config/logins.ts`: File to set up your acc's login (name and passowrd), two factor auth is not yet implemented.
- `src/config/dbcon.ts`: File to set up your db's username, password, port, host, driver using [TypeORM](https://typeorm.io/).

## How to launch.
- Via Docker: 
  - Docker compose: `sudo docker-compose up`.
  - Dockerfile: 
    - build the image: `sudo docker build -t "steambot" .`
    - launch the container with said image: `sudo docker run --name steambot steambot`

- Via npm:
  - `npm run build`: ONLY builds the dist folder.
  - `npm run prod`: Starts production mode, this just launches the app.
  - `npm run dev`: Starts development mode, this will auto-build the dist folder and launches the app each time it detected a change.

- Via Node:
  - `node ./dist/appjs`: Launches the app.

## Some demos:
- ![alt text](https://github.com/Frenzoid/SteamBot/blob/master/githubassets/Screenshot_3.png)
- ![alt text](https://github.com/Frenzoid/SteamBot/blob/master/githubassets/Screenshot_1.png)
- ![alt text](https://github.com/Frenzoid/SteamBot/blob/master/githubassets/Screenshot_2.png)
