const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    clear = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sourceMaps = require('gulp-sourcemaps'),
    stripCssComments = require('gulp-strip-css-comments'),
    babel = require('gulp-babel'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sass', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cssnano())
        .pipe(sourceMaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('code', () => {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

// gulp.task('myScripts', () => {
//     return gulp.src('app/importJS/**/*.js')
//         .pipe(browserSync.reload({stream: true}))
// });

gulp.task('scripts', () => {
    return gulp.src([
        'app/importJS/MainObjectClass.js',
        'app/importJS/orderClass.js',
        'app/importJS/functions.js',
        'app/importJS/adjustment.js',
        'app/importJS/Model.js',
        'app/importJS/View.js',
        'app/importJS/Controller.js',
        'app/importJS/main.js',
        'app/importJS/eventListeners.js'
    ])
        .pipe(sourceMaps.init())
        .pipe(concat('js.min.js'))
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        // .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('spritesmith', () => {
    var spriteData = gulp.src('app/sprites/**/*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.css' //необходимо отредактировать пути к спрайтам
        }));
    spriteData.img.pipe(gulp.dest('app/img/'));
    spriteData.css.pipe(gulp.dest('app/sass/import/'));
});

//build

gulp.task('clean', async () => {
    return clear.sync('dist')
});

gulp.task('build', () => {
    gulp.src('app/css/main.min.css')
        .pipe(stripCssComments())
        .pipe(gulp.dest('dist/css'));

    gulp.src('app/fonts/ **/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('app/js/**/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch('app/importJS/**/*.js', gulp.parallel('scripts'));
});


gulp.task('rebuild', gulp.series('clean', 'build'));

gulp.task('default', gulp.parallel('browser-sync', 'watch'));