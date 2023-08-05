# Temedica

Temedica backend project bootstrapped with expressjs and mvc architecture.

## Installing dependencies
If you want to run the project without docker image, you have to install
dependencies first:
```bash
npm install
```

## Run the project
You have two choices to run the project:
### 1-Run the project directly:

```bash
npm run server
```
Open `http:localhost:3005` in your browser, you can see 'Hi there!' message.


###  2-Run the project using docker image:
```bash
docker build temedica -t temedica-backend

docker run -p 3005:3005 temedica-backend
```

Open `http:localhost:3005` in your browser,
you can see 'Hi there!' message.
