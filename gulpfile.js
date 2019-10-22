const gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    htmlValidator = require('gulp-w3c-html-validator'),
    pngquant = require('gulp-pngquant');
    //browserSync = require("browser-sync"),
    //reload = browserSync.reload;

function pugTask(done){
    gulp.src("./src/pug/**/*.pug")
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest("./build/"));
    done();
}

function lessTask(done){
    gulp.src("./src/less/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/css/"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./build/css/"));
    done();
}

function pngCompressTask(done){
    gulp.src('./src/img/**/*.png')
        .pipe(pngquant({
            quality: '65-80'
        }))
        .pipe(gulp.dest('./build/src/img/'));
    done();
}

function validateHtml(){
    return gulp.src('./build/**/*.html')
        .pipe(htmlValidator())
        .pipe(htmlValidator.reporter()); 
}

function watchLess(){
    gulp.watch("./src/less/**/*.less", lessTask)
}

function watchPug(){
    gulp.watch("./src/pug/**/*.pug", pugTask)
}

function watchPng(){
    gulp.watch("./src/img/**/*.pug", pngCompressTask)
}

function watchHtml(){
    gulp.watch("./build/**/*.html", validateHtml)
}

function autopref(done){
    return gulp.src("./bulid/css/**/*.css")
        .pipe(prefixer("last 2 versions"))
        .pipe(gulp.dest("./build/css/"));
    //done();
}

gulp.task("prefix", autopref);
gulp.task("png", pngCompressTask);
gulp.task("pug", pugTask);
gulp.task("less", lessTask);

gulp.task("default", gulp.parallel(watchPug, watchLess, watchPng, watchHtml));