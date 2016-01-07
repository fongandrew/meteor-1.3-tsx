var gulp    = require('gulp'),
    spawn  = require('child_process').spawn,
    ts      = require('gulp-typescript');


/* Config vars */

// Create project outside scope of function to take advantage of incremental
// compilation speedup
var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript')
});

var srcDir = "src";
var tsGlobs = [srcDir + "/**/*.{ts,tsx}"];
var otherGlobs = [srcDir + "/**/*.*", "!" + srcDir + "/**/*.{ts,tsx}"];
var meteorDir = "meteor";


/* Tasks */

// Compile all .ts and .tsx files
gulp.task("build-ts", function() {
  return gulp.src(tsGlobs)
    .pipe(ts(tsProject))
    .pipe(gulp.dest(meteorDir));
});

// Just copy everything else directly to meteor dir
gulp.task("build-other", function() {
  return gulp.src(otherGlobs)
    .pipe(gulp.dest(meteorDir));
});

// Watchers
gulp.task("watch-ts", function() {
  return gulp.watch(tsGlobs, gulp.series("build-ts"));
});

gulp.task("watch-other", function() {
  return gulp.watch(tsGlobs, gulp.series("build-other"));
});

// Start server
gulp.task("meteor", function(cb) {
  var isWindows = /^win/.test(process.platform);
  var ps;
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
    console.log('child process exited with code ' + code);
  });
  cb();
});

gulp.task("watch", gulp.parallel("watch-ts", "watch-other", "meteor"));

// Start watcher and Meteor server
gulp.task("default", gulp.series("watch"));
