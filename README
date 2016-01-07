Meteor + TypeScript + React
===========================
Boilerplate for a Meteor 1.3 beta project with TypeScript and React

Rather than use Meteor's own build process to handle TypeScript, this repo
uses Gulp (v4) to compile TypeScript to ES6, and then uses Meteor's
`ecmascript` package to compile the ES6. This lets us use ES6 modules
with TypeScript in Meteor with no changes to our source code.

Using Gulp over a Meteor Isobuild package for TypeScript has the advantage of
greater integration with NPM and other parts of the Node.js ecosystem. The
[gulp-typescript](https://github.com/ivogabe/gulp-typescript) plugin is better
maintained then the
[Meteor TypeScript compiler](https://github.com/meteor-typescript/meteor-typescript-compiler)
and it's easier to do things like use a specific version of TypeScript.
