const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const smartgrid = require('smart-grid');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const webpConvert = require('webp-converter');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');


const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

const webpackSettings = {	
	output: {
		filename: 'scripts.js'
	},

	plugins: [

		new webpack.ProvidePlugin({
			'$': 'jquery',
			jquery: 'jquery',
			jQuery: 'jquery',
			'window.jquery': 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'

		}),		

],
	mode: isDev ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	
	devtool: isDev ? 'eval-cheap-module-source-map' : 'none'
}




function clear(){
	return del('build/*');
}

function styles(){
	return gulp.src('./src/css/styles.less')
			   .pipe(gulpif(isDev, sourcemaps.init()))
			   .pipe(less())			   
			   .pipe(gcmq())
			   .pipe(autoprefixer({
		            browsers: ['> 0.1%'],
		            cascade: false
						}))
				 
				  
				 .pipe(gulpif(isProd, cleanCSS({
				level: 2
				 })))

				 /*.pipe(gulpif(isProd, webpCss({isProd,
					 webpClass: '.webp', 
					 noWebpClass: '.no-webp'})))*/
				 .pipe(gulpif(isProd, webpCss()))	 
			   .pipe(gulpif(isDev, sourcemaps.write()))
			   .pipe(gulp.dest('./build/css'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}

const sprite = () => {
	return gulp.src('./src/img/sprite/*.svg')
	  .pipe(
			svgmin({
				plugins: [{
					removeViewBox: false
				}]
			}))
		.pipe(svgstore())
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"))	
}

exports.sprite = sprite;

const imagesToWebp = () => {
  return gulp.src('./src/img/**/*.{jpg,png}')

	       .pipe(webp({
					 quality: 70
				 }))
				 .pipe(gulp.dest('./build/img'))
}

function img(){
	return gulp.src('./src/img/**/*')	       

	       .pipe(imagemin({
					interlaced: true,
					progressive: true,
					optimizationLevel: 3,
					svgoPlugins: [
							{
									removeViewBox: false
							}
					]
			}))
				 .pipe(gulp.dest('./build/img'))
				 .pipe(browserSync.stream());
}

function fonts(){
	return gulp.src('./src/fonts/**/*')
			   .pipe(gulp.dest('./build/fonts'))
}

/*function html(){
	return gulp.src('./src/*.html')
			   .pipe(gulp.dest('./build'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}*/

function pug2html(){
	return gulp.src('./src/pug/*.pug')	
	           .pipe(pug({
					
					pretty: true
				}))
				 .pipe(webpHTML())
				 .pipe(gulp.dest('./build'))				 
			   .pipe(gulpif(isSync, browserSync.stream()));
}


	
function scripts(){
	return gulp.src('./src/js/scripts.js')
				  .pipe(webpackStream(webpackSettings))
				  .pipe(gulp.dest('./build/js'))
}



function watch(){
	if(isSync){
		browserSync.init({
	        server: {
							baseDir: "./build/",
							index: "ui-kit.html"
	        }
	    });
	}

	gulp.watch(['./src/css/**/*.less', './src/components/**/*.less'], styles);
	gulp.watch(['./src/pug/**/*.pug', './src/components/**/*.pug'], pug2html);
	gulp.watch(['./src/js/**/*.js', './src/components/**/*.js'], scripts);
	gulp.watch('./src/img/**/*', img);
	
}

function grid(done){
	let settings = {
		columns: 12,
    	offset: "40px",
    	//mobileFirst: true,
    	container: {
	        maxWidth: "1160px",
	        fields: "70px"
	    },
    	breakPoints: {
	        }
    	
	};

	smartgrid('./src/css', settings);
	done();
}

let build = gulp.series(clear, 
	gulp.parallel(styles, imagesToWebp, img, fonts, sprite, pug2html, scripts)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);

