# node-red-contrib-msg-dimmer
A Node-RED node to create a dimming effect, by keeping the last message within a time interval.

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install bartbutenaers/node-red-contrib-msg-dimmer
```

## Usage
This node remembers the last received input message during a specified time interval, and it will send that message on the output when the end of that time interval has been reached.

![timeline](https://user-images.githubusercontent.com/14224149/71034728-565ca580-211a-11ea-8285-71df6ed6743f.png)

1. When msg1 arrives, the node starts the time interval.
2. When msg2 and msg3 arrive, the time interval has already been started (so those messages are simply remembered).
3. When the timer interval end has been reached, the last message msg3 will be send on the output.
4. When the next message msg4 arrives, the node starts a new time interval.
5. Since no other messages arrive during the time interval, the last message msg4 will be send to the output.
6. And so on ...

Following test flow can be used to test this easily:

![image](https://user-images.githubusercontent.com/14224149/71034008-b9e5d380-2118-11ea-826e-9c0838d6d6f9.png)

```
[{"id":"dc7025c1.f2b4b8","type":"inject","z":"30fb1577.8f556a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":280,"y":500,"wires":[["1de3fac0.8dbcd5"]]},{"id":"7f188a6a.477524","type":"debug","z":"30fb1577.8f556a","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":770,"y":500,"wires":[]},{"id":"1de3fac0.8dbcd5","type":"function","z":"30fb1577.8f556a","name":"counter","func":"var count = flow.get(\"count\")||0;\n\ncount++;\n\nnode.status({fill:\"blue\",shape:\"ring\",text:count});\n\n// Save the new value back to context so it will be available next time\nflow.set('count',count);\n\n// Update the message payload and return - no need to create a new msg\nmsg.payload = count;\nreturn msg;","outputs":1,"noerr":0,"x":440,"y":500,"wires":[["f8a09883.1d8f68"]]},{"id":"f8a09883.1d8f68","type":"msg-dimmer","z":"30fb1577.8f556a","name":"","interval":"4","intervalunit":"secs","x":600,"y":500,"wires":[["7f188a6a.477524"]]}]
```
