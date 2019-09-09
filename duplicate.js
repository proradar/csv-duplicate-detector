function ritual(file) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(file),
        outstream = new(require('stream'))(),
        rl = readline.createInterface(instream, outstream),
        skip = true,
        usernames = {}
    
    rl.on('line', function (line) {
        console.log(line)
        if (skip) {
            skip = false
        } else {
            var temp = ''
            for (var i in line) {
                if (line[i] != ',') {
                    temp = temp + line[i]
                } else {
                    break;
                }
            }
            if (usernames[temp] != undefined) {
                usernames[temp] = usernames[temp] + 1
            } else {
                usernames[temp] = 0
            }
        }
    })

    rl.on('close', function () {
        console.log('done reading file.')
        var duplicates = {}
        for (var i in usernames) {
            if (usernames[i] > 0) {
                duplicates[i] = usernames[i]
            }
        }
        console.log('Duplicates:');
        console.log(duplicates);
    })
}

ritual('./fwiends.csv')