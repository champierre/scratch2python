const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3Scratch2Python {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'scratch2python',
            name: 'Scratch2Python',
            blocks: [
                {
                    opcode: 'inv', // <-- (1)
                    blockType: BlockType.REPORTER,
                    text: '(([arg1],[arg2]),([arg3],[arg4]))の逆行列',
                    arguments: {
                        arg1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ""
                        },
                        arg2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ""
                        },
                        arg3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ""
                        },
                        arg4: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ""
                        }
                    }
                }
            ],
            menus: {
            }
        };
    }

    inv (args) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:8000/inv/' + args.arg1 + '/' + args.arg2 + '/' + args.arg3 + '/' + args.arg4, false);
        request.send(null);
        if (request.status === 200) {
            console.log("success " + request.responseText);
            return request.responseText;
        }
    }
}

module.exports = Scratch3Scratch2Python;

