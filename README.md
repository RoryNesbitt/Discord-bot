# Discord-bot
This bot is set up to run the RPG server my local hobby shop set up at the start of lockdown. As such a lot of the commands are very specific to this one server.
If you still wish to use it intructions follow.  

### Download
To use this bot it has to be run in docker. It requires a mounted volume which will hold it's config file and the bot token which you wish to use.  
Option one is to mount the volume as a discord volume, this is easiest as you don't have to worry about where the mount is.
```
docker volume create volume-name
docker run -e TOKEN_VAL="TOKENIDFORYOURBOT" --mount source=volume-name,target=/bot/config roryisnotacabbage/discord-bot
```
The second option is to create a directory on the host system and mount it. This means you have to be careful not to remove this diretory but makes accessing and editing the config easier.
```
docker run -e TOKEN_VAL="TOKENIDFORYOURBOT" -v /path/to/host/directory:/bot/config roryisnotacabbage/discord-bot
```
### First run
On the first run the bot will copy over the default config which contains an example server setup. Then when being added to a new server it will add that server with the default prefix "!" to the config
