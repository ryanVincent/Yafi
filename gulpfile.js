var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
const babel = require('gulp-babel');


gulp.task('default', ['transpile', 'combine_src', 'minify']);

gulp.task('transpile', function(){
  return gulp.src(['./src/Action.js', './src/Dispatcher.js', './src/Emitter.js', './src/Store.js', './src/WebApi.js'])
    .pipe(babel({
        presets: ['es2015']
      }))
    .pipe(gulp.dest('./src/es5/'));

});

gulp.task('combine_src', ['transpile'], function() {
  return gulp.src(['./src/es5/*.js', './src/Utils.js'])
    .pipe(concat('jules.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify',['combine_src'], function(){
  return gulp.src('./dist/jules.js')
    .pipe(minify())
    .pipe(gulp.dest('./dist/'));
})
