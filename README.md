# Pladmed frontend

Run with: `npm start`

Accessible at port 3000

## Installation instructions for Apache2 server environment

Since this solution is not dockerized at the moment, it can be installed in the `www` directory like a normal website, with some caveats related to ReactJS.

To begin with, [nodejs](https://nodejs.org/) and [npm](https://www.npmjs.com/) will be needed. Assuming a Debian-like Linux distribution, installing them is simple enough:

```
sudo apt get install nodejs
sudo apt get install npm
```

The next step is downloading the pladmed-frontend source code from Github (as .zip, or cloning, it's irrelevant), going into the repo directory and installing the dependencies using `npm`:

```
npm install
```

Then, to build the website, generating all its files:

```
npm run build
```

This will save index.html, and all the .js and .css files which make up the site, in the `build` subdirectory. From there, they can be copied to the desired location inside www, from where Apache2 can serve it just like any other site.

## License
All releases of PlaDMed are licensed under the GPL v2.
