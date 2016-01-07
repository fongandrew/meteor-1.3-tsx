var del     = require('del'),
    gulp    = require('gulp'),
    spawn   = require('child_process').spawn,
    ts      = require('gulp-typescript');


/* Config vars */

// Create project outside scope of function to take advantage of incremental
// compilation speedup
var tsProject = ts.createProject('src/tsconfig.json', {
  typescript: require('typescript')
});

var srcDir = "src";
var meteorDir = "meteor";


/* Tasks */

// Compile all .ts and .tsx files
gulp.task("build-ts", function() {
  return gulp.src([srcDir + "/**/*.{ts,tsx}"])
    .pipe(ts(tsProject))
    .pipe(gulp.dest(meteorDir));
});

// Just copy everything else directly to meteor dir
gulp.task("build-other", function() {
  return gulp.src([srcDir + "/**/*.*",
    "!" + srcDir + "/**/*.{ts,tsx}",
    "!" + srcDir + "/tsconfig.json"
  ]).pipe(gulp.dest(meteorDir));
});

// Compile TS, move everything else in src dir into meteor
gulp.task("build", gulp.parallel("build-ts", "build-other"));

// File-watcher
gulp.task("watch", function() {
  return gulp.watch([srcDir + "/**/*.*"], gulp.series("build"));
});

// Clean up compiled objects in meteor directory
gulp.task("clean", function(cb) {
  del.sync([meteorDir + "/**/*", "!" + meteorDir + "./meteor"]);
  cb();
});

// Start server
gulp.task("meteor", function(cb) {
  var isWindows = /^win/.test(process.platform);
  var ps;

  // Windows is a bit weird and doesn't treat meteor as an executable, so
  // call it via a command-line option passed to cmd
  if (isWindows) {
    ps = spawn('cmd', ['/c', 'meteor'], {
      cwd: meteorDir
    });
  } else {
    ps = spawn('meteor', {
      cwd: meteorDir
    });
  }

  ps.stdout.pipe(process.stdout);
  ps.stderr.pipe(process.stderr);
  ps.on('error', console.error);
  ps.on('exit', function (code) {
    if (code !== 0) {
      console.log('child process exited with code ' + code);
    }
  });
  cb();
});

gulp.task("watch", gulp.series("clean", "build",
  gulp.parallel("watch", "meteor")));

// Start watcher and Meteor server
gulp.task("default", gulp.series("watch"));
