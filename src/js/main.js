/*
 * count-list
 * https://github.com/mognom/count-list-operator
 *
 * Copyright (c) 2018 CoNWeT
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var init = function init() {
        MashupPlatform.wiring.registerCallback("list", listInputCallback);
    };

    // Allow stringified json as input
    var parseInput = function (data) {
        if (typeof data == "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                throw new MashupPlatform.wiring.EndpointTypeError("Input has no valid JSON");
            }
        }

        return data;
    };

    var listInputCallback = function listInputCallback(list) {
        list = parseInput(list);
        // List lenght
        if (MashupPlatform.operator.outputs.length.connected) {
            MashupPlatform.wiring.pushEvent("length", list.length);
        }

        // List ocurrences count
        if (MashupPlatform.operator.outputs.count.connected) {
            var result = {};
            list.forEach(function (value) {
                if (value in result) {
                    result[value]++;
                } else {
                    result[value] = 1;
                }
            });

            MashupPlatform.wiring.pushEvent("count", result);
        }
    };

    init();
})();