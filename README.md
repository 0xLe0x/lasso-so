# Frontend

### Project setup
```
npm install
docker-compose up --build
```
### Run the proxy
- Setup the proxy from lasso-so/proxy see README.md for details
- Try https://local-app.lasso.so

### Create env file
Create a `.env` and add the following keys
```
VITE_GCP_RECAPTCHA_KEY=...
VITE_GOOGLE_OAUTH_CLIENT_ID=...
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run in different modes to access env.MODE files
```
npm run serve -- --mode dev
```

### Run tests
```
npm run test
```

### Run tests with Vitest UI
```
npm run test -- --ui
```

## Run IT and component tests
```
npm run cy:run
```
```
npm run cy:open
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
