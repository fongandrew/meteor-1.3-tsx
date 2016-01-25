Meteor 1.3 + TypeScript + React
===============================
This provides some boilerplate code for getting a Meteor 1.3 app with React
and Typescript working. Rather than use a Meteor Isobuild package, we use tsc
to compile Typescript into ES6 directly, and then have Meteor compile the
JS files into the actual Meteor app.

To distinguish compiled Typescript files from other Javascript files in the
Meteor directory (like `package.js` files) for the purposes of clean up or
excluding files from source control, we append `.m` to each Typescript module
(which means Typescript files end with `.m.ts` or `.m.tsx` and the compiled
Javascript files end with `.m.js`).

The advantage of using `tsc` directly is that removes one extra source of
complexity from the build process and we can pick and choose which version of
Typescript we want to build our TS.

The dowside is we have to run the TSC watcher in parallel with Meteor's build
process, and that we have to follow the `.m` pattern above (or, alternatively,
keep our TS in a directory separate from that of the Meteor app).

Getting Started
---------------
* `npm install` to install dependencies. This will call TSD to (re-)install
  DefinitelyTyped definitions.
* `npm run watch` to watch and compile Typescript while running Meteor.

Other Commands
--------------
* `npm run clean` to clean up compiled files

Typescript Config
-----------------
The `tsconfig.json` file follows the conventions from
https://github.com/Microsoft/TypeScript/wiki/tsconfig.json. The following
settings are currently necessary for TSC to work properly alongside Meteor 1.3:

* `inlineSource` and `inlineSourceMap` are on to enable Meteor to incorporate
Typescript's source maps into its own. As of this time, Meteor will not look
external source maps by default.

* `target: es6` is set to tell tsc to generate plain ES6 modules that
meteor can transpile with Babel.

* `jsx: react` is set so tsc parses the JSX rather than Meteor or Babel. This
is necessary because Meteor currently requires that ES6 `import` statements
include the `jsx` extension for JSX files, but Typescript requires that
ES6 `import` statements *not* include extensions for any type of file. By
having tsc transpile the JSX, tsc will output plain `js` files rather than
`jsx`, which Meteor / Babel can parse without requiring file extensions in the
`import` statements.
