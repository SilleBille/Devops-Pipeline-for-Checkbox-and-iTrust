var glob = require("glob"),
    Random = require("random-js"),
    fs = require('fs');
const execSync = require('child_process').execSync;

const util = require('util');

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

function commit(masterSHA, commitNumber) {
    execSync("git add iTrust/src");
    execSync(`git commit -m "Fuzzing commit for master: ` + masterSHA + ` Build #` + commitNumber + `"`);
    execSync("git push origin fuzzer");
}

function triggerJenkinsBuild(lastCommitSha) {
    execSync('curl http://${JENKINS_IP}:8080/git/notifyCommit?url=${GITHUB_URL}&branches=fuzzer&sha1=' + lastCommitSha);
}

function revertToOriginal(masterSHA) {
    var fuzzerSHA = getSHA('fuzzer')
    if(masterSHA != fuzzerSHA) {
        execSync("git checkout " + masterSHA);
    } 
}

function getSHA(param) {
    return execSync('git rev-parse ' + param).toString().trim();
}

var commitFuzz = function (iterations) {
    
    var javaFiles = getJavaFiles("iTrust/src/main");

    // make sure you are in the correct branch
    execSync("git checkout fuzzer");

    var masterSHA = getSHA('master');
    while(iterations-- > 0)
    {
        // Start with a fresh state
        // Revert commit
        revertToOriginal(masterSHA);

        javaFiles.forEach(function(file){
            fuzzer.fuzzFile(file);
        });

        // Commit random changes
        commit(masterSHA, iterations);

        // Trigger build Jenkins build job
        //triggerJenkinsBuild(getSHA('HEAD'));
    }
}

commitFuzz(2)