var assemble = require('assemble');
var extname = require('gulp-extname');
var browserSync = require('browser-sync').create();
var watch = require('base-watch');

var midden = require('.');

/**
 * Create an instance of assemble
 */

var app = assemble();

/**
 * Load helper
 */

app.helper('midden', midden(true));

/**
 * Load Plugins
 */

app.use(watch());

/**
 * define tasks
 */

app.task('content', function () {
  app.pages('test/src/**/*.hbs');
  return app.toStream('pages')
    .pipe(app.renderFile())
    .on('err', console.error)
    .pipe(extname())
    .pipe(app.dest('test/dest'))
    .pipe(browserSync.stream());
});

app.task('assets', function(){
  return app.copy(['node_modules/midden/dist/js/midden-client.js', 'node_modules/midden/dist/styles/midden.css'], 'test/dest');
});

/**
 * Static server
 */

app.task('serve', function () {
  browserSync.init({
    port: 8000,
    startPath: 'index.html',
    server: {
      baseDir: 'test/dest'
    }
  });
});

app.task('watch', function () {
  app.watch('test/src/**/*.{md,hbs}', ['content']);
});

app.task('default', ['assets', 'content'], app.parallel(['serve', 'watch']));

/**
 * Expose the assemble instance
 */

module.exports = app;