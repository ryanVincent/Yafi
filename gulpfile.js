var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
const babel = require('gulp-babel');


gulp.task('default', ['combine_src', 'minify']);

gulp.task('combine_src', function() {
  return gulp.src('./src/*.js')
    .pipe(babel({
          presets: ['es2015']
      }))
    .pipe(concat('jules.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', function(){
  return gulp.src('./dist/jules.js')
    .pipe(minify())
    .pipe(gulp.dest('./dist/'));
})
