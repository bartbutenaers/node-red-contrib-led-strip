/**
 * Copyright 2018 Bart Butenaers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 module.exports = function(RED) {
    var settings = RED.settings;

    function MsgDimmerNode(config) {
        RED.nodes.createNode(this, config);
        this.interval = parseInt(config.interval);
        this.intervalunit = config.intervalunit;

        var node = this;
        
        // Convert the 'interval' value to milliseconds (based on the selected time unit)
        switch(config.intervalunit) {
            case "secs":
                this.interval *= 1000;
                break;
            case "mins":
                this.interval *= 1000 * 60;
                break;
            case "hours":
                this.interval *= 1000 * 60 * 60;
                break;            
            default: // "msecs" so no conversion needed
        }
        
        node.on("input", function(msg) {
            node.mostRecentMsg = msg;
            
            // Start a new timer only when no timer active yet
            if (!node.timerid) {
                node.timerid = setTimeout(function() {    
                    node.send(node.mostRecentMsg);
                    node.timerid = null;                          
                }, node.interval); 
            }
        });
        
        node.on("close", function() {       
            if (node.timerid) {
                clearTimeout(node.timerid);
            }
        });
    }

    RED.nodes.registerType("msg-dimmer", MsgDimmerNode);
}