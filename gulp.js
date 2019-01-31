/*
    This file in the main entry point for defining Gulp tasks and using Gulp plugins.
    Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    del = require('del');

var config = {
    js: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/timeago/jquery.timeago.js',
        'scripts/handlebars.min.js',
        'scripts/marked.js'
    ],    
    css: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css'
    ],
    fonts: [
        'bower_components/font-awesome/fonts/FontAwesome.otf',
        'bower_components/font-awesome/fonts/fontawesome-webfont.eot',
        'bower_components/font-awesome/fonts/fontawesome-webfont.svg',
        'bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff2'
    ], 
    app: [
        'build/Littlei.js',
        'build/render.js',
        'build/post.js',
        'build/navitem.js',
        'build/file.js',
        'build/error.js',
        'build/config.js',
        'build/cms.js',
        'build/renders/footer.js',
        'build/renders/home.js',
        'build/renders/page.js',
        'build/renders/post.js'
    ]
};

gulp.task('clean', function () {
    return del(['dist/scripts/all.min.js', 'dist/styles/all.min.css']);
});


gulp.task('scripts', function () {
    return gulp.src(config.js)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('app', function () {
    return gulp.src(config.app)
        .pipe(concat('littlei.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function () {
    return gulp.src(config.css)
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('styles', function () {
    return gulp.src(config.fonts)
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('default', ['clean', 'scripts', 'styles', 'fonts', 'app'], function () {

});



