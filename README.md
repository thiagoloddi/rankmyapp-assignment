# rankmyapp-assignment

In this application you can set up alarms to perform searches in YouTube and email you the latest results.

- [Run with docker-compose](#run-with-docker-compose)
- [Run mannually](#run-manually-(development))
- [Caveats](#caveats)

# Run with docker-compose
```bash
git clone git@github.com:thiagoloddi/rankmyapp-assignment.git
cd rankmyapp-assignment
docker-compose up --build
```

Access `localhost:8080` in your browser to start using the application.

# Run manually (development)

## Install
```bash
git clone git@github.com:thiagoloddi/rankmyapp-assignment.git
cd rankmyapp-assignment
npm install
```

## Build
```bash
npm run build
```
Run this command with environment variable `NODE_ENV='local'` to run in watch mode.

## Run
```bash
npm start
```

Or, for watch mode:
```bash
npm run dev
```

Access `localhost:8080` in your browser to start using the application.

# Tests
```bash
npm test
```

# Caveats

- I couldn't generate an API access key in ebay website. I don't know if it was a bug or I missed something. So, I used YouTube Data API instead, sending the top 3 newest videos according to a search phrase.
