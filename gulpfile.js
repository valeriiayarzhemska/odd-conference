import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import ghPages from 'gulp-gh-pages';
import browserSync from 'browser-sync';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

import concat from 'gulp-concat';
import babel from 'gulp-babel';
import replace from 'gulp-replace';
import { deleteAsync } from 'del';

const sass = gulpSass(dartSass);
const server = browserSync.create();

const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/src/styles/',
  },
  scripts: {
    src: 'src/scripts/*.js',
    dest: 'dist/src/scripts/',
  },
  html: {
    src: '*.html',
    dest: 'dist/',
  },
  assets: {
    src: 'src/assets/**/*.{png,jpg,jpeg,gif,svg,pdf,ttf,eot}',
    dest: 'dist/src/assets/',
  },
};

gulp.task('clean', async function () {
  const deletedPaths = await deleteAsync(['dist']);

  return deletedPaths;
});

gulp.task('styles', function () {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

gulp.task('assets', function () {
  return gulp.src(paths.assets.src).pipe(gulp.dest(paths.assets.dest));
});

gulp.task('html', function () {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(replace('dist/src/styles', 'src/styles'))
    .pipe(replace('dist/src/scripts', 'src/scripts'))
    .pipe(replace('dist/src/assets', 'src/scripts'))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  server.init({
    server: 'dist',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp
    .watch(paths.styles.src, gulp.series('styles'))
    .on('change', server.reload);
  gulp
    .watch(paths.scripts.src, gulp.series('scripts'))
    .on('change', server.reload);
  gulp
    .watch(paths.assets.src, gulp.series('assets'))
    .on('change', server.reload);
  gulp.watch(paths.html.src, gulp.series('html')).on('change', server.reload);
});

export const build = gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('styles', 'scripts', 'assets', 'html'))
);

gulp.task('default', gulp.series('build', 'serve'));

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*').pipe(ghPages());
});

export default build;
