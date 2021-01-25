---
title: HTML5 clone of Facebook's Paper photo tilt gesture/UX
description: HTML5 clone of Facebook's Paper photo tilt gesture/UX
date: 2014-02-01
tags: ['ux', 'paper', 'fb']
layout: post.njk
---
Facebook will be releasing their new [Paper][1] app in a few days. After watching their [preview video][2] I was struck by the new gestures/UX it introduced.

![Facebook's Paper app in action](/img/tilt.gif =320x320)

While watching the video, I was thinking how I could replicate some of its features using plain HTML, CSS and Javascript.

I decided to start with the photo tilt feature, it turned out to be relatively simple to implement (at least based on what I have seen in the video)

I just pushed to Github a tool/hack called [PhotoTilt][4] which, given a photo and a container, will replicate Paper's tilt functionality.

One advantage that native currently has over the mobile web is that there is no way to stop the device from changing orientation (portrait/landscape) when tilting too much. There is an experimental feature: [Screen.lockOrientation][5] but currently only works in Firefox for web pages that are in full-screen mode.

Finally, here is a working [demo][6]. Make sure you test this on a device with a triaxial/accelerometer, like a phone/tablet, with orientation locked in portrait mode.

[1]: https://newsroom.fb.com/News/793/Introducing-Paper-Stories-from-Facebook
[2]: https://vimeo.com/85761988
[4]: https://github.com/tregoning/photoTilt
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Screen.lockOrientation
[6]: /demo/tilt/index.html
