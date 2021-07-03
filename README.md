# Simple chat
An example chat application that demonstrates sending, displaying messages from all senders and retrieving newer messages at the end of scrolling.

## Instructions
In order to run and test the application make sure you have Node.js version `>= 12.0.0` installed before following the next steps.

1. Copy `.env.dist` to `.env`

```shell script
cp .env.dist .env
```

2. Provide your environment variables in `.env`

```dotenv
API_KEY=[YOUR_AWESOME_UNIQUE_TOKEN]
API_USER=me
API_URL=https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0
```

3. Install dependencies

```shell script
yarn install
```

4. Run the application

```shell script
yarn run start
```

The application should be running at http://localhost:1234 