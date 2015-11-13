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
    .pipe(concat('yafi.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('minify', function(){
  return gulp.src('./build/jules.js')
    .pipe(minify())
    .pipe(gulp.dest('./build/'));
})
