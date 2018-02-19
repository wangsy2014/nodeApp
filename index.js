var express = require('express')
var multiparty = require('multiparty')
var fs = require('fs')
var path = require('path')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
console.error("server is starting and port is : 3000");

var saveDir = path.resolve(__dirname, 'FileFolder')
console.error("文件的保存目录：" + saveDir);

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html')
app.get('/', function (req, res) {
    // res.render('index',{})
    res.format({
        'application/json': function () {
            res.send({
                a: 1
            })
        }
    })
})
app.post('/', (req, res) => {
    var form = new multiparty.Form();
    let flag = false;
    form.parse(req, function (err, fields, files) {
        console.error(fields)
        files.file.forEach(element => {
            // element.path
            let destPath = saveDir + "\/" + element.originalFilename
            let sourceFile = element.path;
            let readStream = fs.createReadStream(sourceFile);
            let writeStream = fs.createWriteStream(destPath);
            readStream.pipe(writeStream);
            console.error("文件保存服务器中已经完成");    
        });
        res.format({
            'application/json': function () {
                res.send({
                    result : true
                })
            }
        })

    });

})
app.listen(3000)