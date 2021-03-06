# Yumster!

## Database Setup

If you don't have Postgres on your computer run
```
brew install postgres
```
Run npm install
and then run:
```
npm install -g knex
```
Then to start your database run:
```
postgres -D /usr/local/var/postgres
```
To create your tables and seed data run in a new tab:
```
createdb yumsnap
knex migrate:latest
knex seed:run
```
Do not CTRL-C to stop Postgres
To stop your database:
```
pg_ctl -D /usr/local/var/postgres stop -s -m fast
```

To start the server, run in a new tab:
```
npm run start
```

To drop the database, stop your server and run:
```
dropdb yumsnap
```

##Git workflow
Pull the most recent version down to your master: git pull --rebase origin master

Checkout a new branch for what you're working on: git checkout -b feat/a-description-here-#[eg]3

ONLY EVER PUSH TO YOUR FEATURE BRANCH, AKA DO NOT PUSH TO MASTER: git push origin feat/a-description-here-#[eg]3

Submit a pull request on Github from the feature branch to master

Someone who is not you (gitlord) must review and merge.

After merging the pull request the gitlord will slack @channel REBASE.

Once you see this it is super important to do another: git pull --rebase origin master
