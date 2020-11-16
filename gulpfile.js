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
			   .pipe(gulpif(isDev, sourcemaps.write()))
			   .pipe(gulp.dest('./build/css'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}

function img(){
	return gulp.src('./src/img/**/*')
			   .pipe(gulp.dest('./build/img'))
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
	return gulp.src(['./src/pug/**/*.pug', '!src/pug/**/_*.pug'])	
	           .pipe(pug({
					//basedir: __dirname,
					pretty: true
				}))
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

	gulp.watch('./src/css/**/*.less', styles);
	gulp.watch('./src/pug/**/*.pug', pug2html);
	gulp.watch('./src/js/**/*.js', scripts);
	
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
	gulp.parallel(styles, img, fonts, pug2html, scripts)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);

