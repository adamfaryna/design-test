var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var less         = require('gulp-less');

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });


// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {
  browserSync.init({
    browser: 'google chrome',
    server: './app',
    port: '3000'
  });

  gulp.watch('less/*.less', ['less']);
  gulp.watch('app/index.html').on('change', browserSync.reload);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
  return gulp.src('less/style.less')
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
