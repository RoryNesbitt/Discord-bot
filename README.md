# Discord-bot
This bot is set up to run the RPG server my local hobby shop set up at the start of lockdown. As such a lot of the commands are very specific to this one server.
If you still wish to use it intructions follow.  

### Download
To use this bot is made to be run in a docker container. It requires a mounted volume which will hold it's config file and the bot token which you wish to use.  
Option one is to mount the volume as a discord volume, this is easiest as you don't have to worry about where the mount is.
```
docker volume create volume-name
docker run --name="discord-bot" -e TOKEN_VAL="TOKENIDFORYOURBOT" -v volume-name:/bot/config roryisnotacabbage/discord-bot
```

#### Download to a Pi
A Raspberry Pi, as I usually run this on, will not run the docker image as is. Instead it is required to manually create the image from this source code. To do so run the following code. after doing so, you can use the local image by running one of the prior commands with `discord-bot` as the image name, ommitting the `roryisnotacabbage/`.
```
git clone https://github.com/RoryNesbitt/Discord-bot.git
docker build -t discord-bot ./Discord-bot
rm -rf Discord-bot
```
### First run
On the first run the bot will copy over the default config which contains an example server setup. Then when being added to a new server it will add that server with the default prefix "!" to the config

### Running without docker
To run the code locally it requires a minor change to [index.js](index.js).
`process.env.TOKEN_VAL` on line 17 needs to be replaced by your bot's token sourounded by quotes. 
Now add a `./config` directory and the code can be run with:
```
npm i
node .
```
