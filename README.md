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

The downside is that we have to manage two build systems and a slightly awkward
directory structure.

Directory / File Structure
--------------------------
* `src` - This is where all Meteor source files live. You should include both
  TypeScript files and other files like CSS, HTML, and non-compiled JS. The
  Gulp task runner will compile `ts` and `tsx` files and simply copy anything
  else over to the `meteor` folder when building.

* `src/tsconfig.json` - This file is used to customize how compilation works
  and follows the guidelines at
  https://github.com/Microsoft/TypeScript/wiki/tsconfig.json. I recommend
  leaving `inlineSource` and `inlineSourceMap` on since Meteor does a better
  job generating its own source maps with inline sources than external sources.

* `meteor` - This is where the actual (compiled) Meteor app resides. You should
  place your source code in `src` rather than here since the Gulp task runner
  will wipe out any files here other than the ones in the `.meteor`
  sub-directory. But if you're adding or removing Meteor packages, do it from
  this directory.

Commands
--------
You can use the [Gulp CLI](https://github.com/gulpjs/gulp-cli) to call tasks
directly, or just run the following NPM commands:

* `npm run watch` - Watches and compiles TypeScript files in the `src`
  directory. Watches and copies any other files directly over to the `meteor`
  dir as-is. Also starts up the `meteor` dev server automatically.

* `npm run meteor` - Calls Meteor without building any TypeScript.
  You can pass commands to meteor like so: `npm run meter -- add some-package`.
  Or just `cd meteor`. It doesn't do anything fancy.

* `npm run clean` - Cleans out all compiled files in the `meteor` directory.
