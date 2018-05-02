//引入gulp和gulp插件
  var gulp = require('gulp'),  
  runSequence = require('run-sequence'),   
  rev = require('gulp-rev'),    
  revCollector = require('gulp-rev-collector');

//定义css、js文件路径，是本地css,js文件的路径，可自行配置
  var cssUrl = 'css/*.css',   
  jsUrl = 'js/*.js',
  libUrl = 'lib/**/*.js'

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revCss', function(){   
  return gulp.src(cssUrl)        
 .pipe(rev())        
 .pipe(rev.manifest())        
 .pipe(gulp.dest('rev/css'));
 });

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revJs', function(){    
  return gulp.src(jsUrl)        
 .pipe(rev())        
 .pipe(rev.manifest())        
 .pipe(gulp.dest('rev/js'));
 });

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revLib', function(){    
  return gulp.src(libUrl)        
 .pipe(rev())        
 .pipe(rev.manifest())        
 .pipe(gulp.dest('rev/lib'));
});

 //Html更换css、js文件版本
   gulp.task('revHtml', function () {    
   return gulp.src(['rev/**/*.json', '*.html'])  /*WEB-INF/views是本地html文件的路径，可自行配置*/        
  .pipe(revCollector())        
  .pipe(gulp.dest(''));  /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
 });

//开发构建
  gulp.task('dev', function (done) {   
  condition = false;   
  runSequence(       
  ['revCss'],       
  ['revJs'],
  ['revLib'],        
  ['revHtml'],        
  done);});
  gulp.task('default', ['dev']);
