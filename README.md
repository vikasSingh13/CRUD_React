Below you will find some information on how to clone and run this app and perform common tasks.<br>

## Cloning the app
Open your git bash command prompt or normal command prompt and use below code to clone this repository.
```
  If you are using ssh
  git clone git@github.com:vikasSingh13/CRUD_React.git

  If you are using http
  git clone https://github.com/vikasSingh13/CRUD_React.git
```

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    alerts/
      alert.css
      Alert.js
    header/
      header.css
      header.js
    images/
      all images
    listing/
      Listing.css
      Listing.js
    notfound/
      notfound.css
      NotFoundPage.js
    users/
      ContactAddView.js
      EditContact.js
      user.css
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

`npm install` or 'yarn install'
To install all the Package.json dependecies.

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Alternatively you may use `yarn`. If you don't have yarn, you can use below to install that:
```sh
npm install --save yarn
yarn start - to run the project(alternate to npm start)
```

## Installing a Dependency

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```sh
npm install --save react-router
```

Alternatively you may use `yarn`:

```sh
yarn add react-router
```

This works for any library, not just `react-router`.

## Importing a Component

This project setup supports ES6 modules thanks to Babel.<br>
While you can still use `require()` and `module.exports`, we encourage you to use [`import` and `export`](http://exploringjs.com/es6/ch_modules.html) instead.

For example:

### `Alert.js`

```js
import React, { Component } from 'react';

class Alert extends Component {
  render() {
    // ...
  }
}

export default Alert; // Don’t forget to use export default!
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
```sh
  npm create-react-app your-app-name
```
This command will give you the basic folder structure of a React app.
