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

    function LedStripNode(config) {
        RED.nodes.createNode(this, config);
        this.aspectRatio      = config.aspectRatio;
        this.delay            = parseInt(config.delay);    
        this.leds             = config.leds;
        
        // Convert the 'delay' value to milliseconds (based on the selected time unit)
        switch(config.delayUnit) {
            case "secs":
                this.delay *= 1000;
                break;
            case "mins":
                this.delay *= 1000 * 60;
                break;        
            default: // "msecs" so no conversion needed
        }
        
        var node = this;
            
        // Get the direction value from the location specified in the typedinput field, and cache the value
        RED.util.evaluateNodeProperty(config.direction, config.directionType, node, null, (err, directionValue) => {
            if (err) {
                // TODO fout afhandelen
                return;
            }
            else {
                node.directionValue = directionValue;
            }
        });
            
        // Get the 'on' state value from the location specified in the typedinput field, and cache the value
        RED.util.evaluateNodeProperty(config.offState, config.offStateType, node, null, (err, offStateValue) => {
            if (err) {
                // TODO fout afhandelen
                return;
            }
            else {
                node.offStateValue = offStateValue;
            }
        });
        
        node.on("input", function(msg) {
            for (var i = 0; i < node.leds.length; i++) {
                var led = node.leds[i];
                
                // Get the current state from the location specified in the typedinput field
                RED.util.evaluateNodeProperty(led.source, led.sourceType, node, msg, (err, sourceValue) => {
                    if (err) {
                        // TODO fout afhandelen.  
                        // We zullen hier regelmatig terecht kunnen komen, als de andere nodes in de flow de source variabele niet goed opvullen...
                    }
                    else {
                        // TODO hier de code zetten om volgende variabelen te gebruiken:
                        // node.onStateValue (constante)
                        // node.offStateValue (constante)
                        // node.aspectRatio (checkbox)
                        // node.delay (milliseconden)
                        // alle variabelen van led ...
                    }
                });
            }
        });
        
        node.on("close", function() {       

        });
    }

    RED.nodes.registerType("led-strip", LedStripNode);
}
