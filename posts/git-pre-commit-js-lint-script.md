---
title: Javascript lint pre-commit script
description: Javascript lint pre-commit script
date: 2013-03-10
tags: ['js', 'lint', 'git']
layout: post.njk
hasCode: true
---
I've created a GIT pre-commit script called ["Sgt Donowitz"][1] (named after the [character][2] in the movie Inglorious Bastards). The script enforces Javascript code quality and consistency by using [JSHint][3].

The script runs all new or modified Javascript files against JSHint for every commit; if it finds any issues it simply aborts the commit.

![Sgt Donowitz in LEGO form](/img/sgt-donowitz.jpg =640x426)

###### [Photo by pasukaru76][5]

You can configure what rules you want to enforce/ignore by using the config file [".jshintrc"][6] (see [here][7] for all the available options).

You can also set rules to ignore any file or directory (e.g. 3rd party libraries) by using ".jshintignore" (it works similarly to [".gitignore"][8] files).

Nowadays you can integrate JS Linting [into][9] [most][10] [IDEs][11]. Whilst this is true, there is nothing stoping you from committing code that doesn't pass JS Linting. That's where [Sgt Donowitz][1] comes in: it ensures code goodness remains high at all times by blocking bad/rushed code from being commited.

In a nutshell, [Sgt Donowitz][1] will force you to keep your JS code quality high and consistent. To setup the pre-commit script, simply run the following command from your project's root:

```shell
curl -s jt.io/lint | sh
```

The source code is published on [Github][1] feel free to tweak it, create an [issue][12] or leave a comment... In the meantime: "The beatings will continue until morale improves".

[1]: https://github.com/tregoning/Sgt-Donowitz
[2]: https://www.imdb.com/title/tt0361748/mediaviewer/rm1645684224/
[3]: http://jshint.com
[5]: https://www.flickr.com/photos/pasukaru76/5721986136
[6]: https://github.com/tregoning/Sgt-Donowitz/blob/master/.jshintrc
[7]: http://www.jshint.com/docs/#enforcing_options
[8]: https://www.kernel.org/pub/software/scm/git/docs/gitignore.html
[9]: http://blogs.jetbrains.com/idea/2012/05/lint-your-javascript-with-jslintjshint-in-real-time/
[10]: https://www.phpied.com/jslint-on-mac-textmate/
[11]: https://github.com/uipoet/sublime-jshint
[12]: https://github.com/tregoning/Sgt-Donowitz/issues
