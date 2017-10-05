var glob = require("glob"),
    Random = require("random-js"),
    fs = require('fs');

var getJavaFiles = function (dir) {
    var javaFiles = [];
    var files = glob.sync(dir + "/**/*.java")
    files.forEach(function (file){
        if(!file.match("/model/"))
            javaFiles.push(file);
    })
    return javaFiles;
}

var fuzzer = 
{
    random : function () { return new Random(Random.engines.mt19937().autoSeed())},

    fuzzFile: function(filePath) {
        var file = fs.readFileSync(filePath,'utf-8');
        var lines = file.split('\n');
        var tempFilePath = filePath + 'test';
        if(fs.existsSync(tempFilePath))
            fs.unlinkSync(tempFilePath);
        
        lines.forEach(function (line) {

            if(line.match("while") || line.match("if"))
            {
                if(fuzzer.random().bool(0.5) && line.match(">"))
                    line = line.replace('>','<');
                if(fuzzer.random().bool(0.5) && line.match("<"))
                    line = line.replace('<','>');
                if(fuzzer.random().bool(0.5) && line.match("=="))
                    line = line.replace('==','!=');
                if(fuzzer.random().bool(0.5) && line.match("!="))
                    line = line.replace('!=','==');
            }

            if(fuzzer.random().bool(0.5) && line.match('"((\\"|[^"])+0(\\"|[^"])*|(\\"|[^"])*0(\\"|[^"])+)"'))
                line = line.replace('0','1');

            if(fuzzer.random().bool(0.5) && line.match('(["\'])(\\"|\\\'|[^"\'])+\1') && !line.match("//") 
                    && !line.match("@"))
                line = line.replace(/(["\'])(\\"|\\\'|[^"\'])+\1/g, '"' + fuzzer.random().string(10) + '"')

            fs.appendFileSync(tempFilePath, line + '\n');
        });

        fs.renameSync(tempFilePath, filePath);
    }
}

var commitFuzz = function (iterations) {
    
    var javaFiles = getJavaFiles("iTrust/src/main")

    while(iterations-- > 0)
    {
        javaFiles.forEach(function(file){
            fuzzer.fuzzFile(file);
        })
    }
}

commitFuzz(1)