# Temedica

Temedica frontend project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installing dependencies
If you want to run the project without docker image, you have to install
dependencies first:
```bash
yarn install
```

## Run the project
You have three choices to run the project:
### 1-Run the project in development:

```bash
yarn dev
```
Open `http:localhost:3000` in your browser.

###  2-Run the project in production:
```bash
yarn build
yarn start
```

###  3-Run the project using docker image:
```bash
docker build temedica -t temedica-frontend

docker run -p 5000:3000 temedica-frontend
```

Open `http:localhost:5000` in your browser.

## Test the project

`yarn test`
Launches the test runner in the interactive watch mode.
It's possible to modify jest configuration from dedicated jest configuration file `jest.config.js`.
You can find and put mocks into the `__mock__` directory. 
Also you can find test utils here : `utils/testUtil.tsx` 
You have to put your test file into the __test__ directory beside your component.
You have to use this pattern for test file name: [filename].test.[ts|tsx]