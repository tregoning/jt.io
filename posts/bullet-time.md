---
title: Bullet Time SFX Using Nothing but Web Tech
description: Bullet Time SFX Using Nothing but Web Tech
date: 2015-03-31
tags: ['sfx']
layout: post.njk
---
![Example output from bulleTime.js](/img/bulletTime/bulletTimeDemo.gif =720x540)

bulletTime.js is a web application that attempts to replicate the special effect ['Bullet Time'][1] famously introduced in the movie: The Matrix.

The proliferation of advanced web technologies mainly: [getUserMedia/WebRTC][3] and [Web Sockets][4] created a unique opportunity to develop a web application that can potentially replicate the famous effect.

During [Netflix's Hack Day][5], I had the opportunity to spend a few hours developing an early prototype of the concept. The main idea is to use an array of laptops, and take advantage of their webcam, native display and connectivity features.

## Infrastructure:

The infrastructure is composed of:

* Multiple worker devices: Each worker device will take one photo per 'bullet time' FX scene
* One master machine: Responsible for collating all the photos and generate the animated GIF. It also serves as a dashboard indicating the status of all the worker devices
* One trigger device: This is how we tell all the worker devices when to take a photo. (In the GIF above, if you look carefully, you will notice that I'm using my phone as the trigger device).

## First Challenge: Setup:

The physical setup of the machines is the trickiest part, the correct angle (pitch and yaw) for each device is crucial (otherwise the effect is broken and you end up with something like [this][7])

The master machine needs to be aware of the position (index) of each worker (to be able to interlace the photos in the correct order). In order to access its webcam each worker needs to grant access permission via the browser.

I attempted to solve some of these challenges by dynamically allocating the index to each worker/camera every time a worker page is loaded. The page will display its index in a huge font that almost literally takes the whole screen (i.e. [100vh][8]). Further each worker that gets added to the system is instantly displayed on the master dashboard. Said dashboard also conveniently displays the status of each worker stating whether access to the webcam has been granted or not.

### Setup example:
In this video all the workers are on the same machine, obviously when actually doing this, each worker needs to be on a different device

![bulletTime.js setup](https://vimeo.com/121859990)

## Second Challenge: Synchronisation

Triggering all the photos at the exact moment in all devices is paramount for the effect to work ([here][9] is somewhat comedic example of when there is a small delay between shots). Achieving synchronicity between all the machines turned out to be very difficult and it looks like [it's known to be a hard problem][10]

I tried a few different techniques while trying to overcome this issue:

### Sound:

I attempted to use sound as a trigger (in the hope of removing network latency/congestion from the problem) I ended up generating a [DTMF][11] tone on my trigger device and [this][12] javascript implementation of the [Goertzel algorithm][13] running on each worker device. The idea was to process the incoming audio from the microphone waiting for the specific DTMF tone. Unfortunately this proved to be the most unreliable method. Different machines processed the incoming sound at vastly different speeds (I'm guessing due to CPU/microphone differences)

### NTP (Network Time Protocol)

Another technique I attempted to use was relying on NTP. Basically giving the machines a specific time in the near future (a couple of seconds) when they needed to take a shot. Unfortunately it looks like NTP in practice does not provide millisecond level precision (at least over WIFI)

### Web Sockets

This is the technique I ended up using. It was somewhat flaky since the devices were connected via WIFI and as a result network traffic vastly affected how precise the synchronization was. It did however produce acceptable results even if it was not super reliable.

### Potential Alternatives:

As explained, Web Sockets was the least crappy solution. There are a few more things that I would like to try including:

* Web Sockets over a wired connection: (get a small switch and connect all laptops using ethernet cables)
* I was/am pretty bullish on relying on NTP solution. In theory it should be possible to sync machines in the same LAN within a few milliseconds (or even better use [PTP][14])
* Instead of attempting to process the audio stream in order to detect a specific tone, use a much simpler signal such as loudness.

## Third Challenge: Webcams

While a quick trip to Netflix's IT department granted me with 7 Macs + mine (4 Retina Pros, 3 Air, 1 Pro 13... how cool is Netflix's IT department?) it turned out the quality, color/hues, distortions were different (even within the same models).

This is most likely because the laptops were 'loaners' so they have been heavily used. Unfortunately I didn't notice this while shooting, as a result I ended up manually removing the bad frames from the GIF after the fact). Here are a few examples of bad frames, and how they affect the final result: [Reference Frame][15], [Bad quality/blurry Frame][16], [Bad colour/hue][17] and final [result][18] (including the bad frames)

## Future

There are a few things that I'm planning on improving in the near future. One of the most important ones is to modify what each worker screen displays. The idea is to show a semi-transparent feed of what the direct sibling worker (n-1) device is seeing on top of its current camera feed. This will go a long way in making the setup easier and the final result less jumpy.

Using phones would yield substantially better results for a few reasons: They have much better cameras than laptops, it's easier to find several units of the exact same model/version and finally, it drastically reduces the distance between the lenses (thus making a smoother effect)

Mobile Android already supports the required web technologies, unfortunately Safari [does not][19], leaving (at least for now) iPhones out of the fun.

Isn't the [Open Web][20] awesome? This whole thing was designed, coded and field tested during a hack day. I'm pretty sure that I can yield significantly better results with a few tweaks. I will report back whenever I get some the time/opportunity to try again (if you try it, please let [me][21] know)

Finally here are a few photos of the [actual][22], [setup][23] and a "best of" [video][24]. The source code for bulletTime.js is available in Github [here][25], obviously pull-requests are welcome.

[1]: https://youtu.be/ggFKLxAQBbc?t=38
[2]: https://raw.githubusercontent.com/tregoning/bulletTime.js/master/client/img/demo.gif
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
[4]: https://developer.mozilla.org/en-US/docs/WebSockets
[5]: http://techblog.netflix.com/2015/03/netflix-hack-day-winter-2015.html
[7]: /img/bulletTime/misaligned.gif
[8]: https://developer.mozilla.org/en-US/docs/Web/CSS/length#Viewport-percentage_lengths
[9]: /img/bulletTime/bad-timing.gif
[10]: http://queue.acm.org/detail.cfm?id=2745385
[11]: https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling
[12]: https://github.com/Ravenstine/goertzeljs
[13]: https://en.wikipedia.org/wiki/Goertzel_algorithm
[14]: https://en.wikipedia.org/wiki/Precision_Time_Protocol
[15]: /img/bulletTime/good-frame.png
[16]: /img/bulletTime/bad-quality.png
[17]: /img/bulletTime/bad-colour-hue.png
[18]: /img/bulletTime/bad-result.gif
[19]: https://caniuse.com/#feat=stream
[20]: https://en.wikipedia.org/wiki/Open_Web
[21]: https://twitter.com/tregoning
[22]: https://www.flickr.com/gp/johnniewalker/8DSWB6
[23]: https://www.flickr.com/gp/johnniewalker/PD1T70
[24]: https://www.flickr.com/photos/johnniewalker/16735544155/
[25]: https://github.com/tregoning/bulletTime.js
