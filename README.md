<b>Dependencies:</b>

node: v14.17.4
<<<<<<< HEAD
mysql Ver 15.1 Distrib 10.4.22-MariaDB
=======
mysql: 15.1 Distrib 10.4.22-MariaDB
>>>>>>> 15eef1f6d86a84ea1c5c5837938b6b15a510077f

Run following command to clone from github:

`git clone https://github.com/AhmadRaju007/expressAuthentication.git`

When project is successfully cloned execute following command to generate node modules:

`npm install`

Setup your .env file according to .env.example. Here you will have to input a random salt named as TOKEN_KEY to generate JWT token.
APP_PORT will setup your port for running the project. Rest of the variables are needed for DB connection.

Now in order to generate your database run following command:

`node db/create_database.js`

When all these are done run following to start your server in your selected port:

`npm start`

If you face any problem feel free to contact me: rajuahmad6789@gmail.com.
