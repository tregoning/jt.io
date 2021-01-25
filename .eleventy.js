const {DateTime} = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const implicitFigures = require('markdown-it-implicit-figures');
const embedYouTube = require("./markdown-custom-plugins/markdown-it-youtube");
const embedVimeo = require("./markdown-custom-plugins/markdown-it-vimeo");
const mdLinksPlugin = require("./markdown-custom-plugins/markdown-it-links");
const embedImgSize = require('markdown-it-imsize');
const mdHeadersPlugin = require('markdown-it-anchor');
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addLayoutAlias("post", "_layouts/post.njk");

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("d LLLL yyyy");
    });

    eleventyConfig.addFilter("shortReadableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLL dd yyyy");
    });

    // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#Valid_datetime_Values
    eleventyConfig.addFilter("machineReadableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy-LL-dd");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    eleventyConfig.addCollection("tagList", function (collection) {
        let tagSet = new Set();
        collection.getAll().forEach(function (item) {
            if ("tags" in item.data) {
                let tags = item.data.tags;

                tags = tags.filter(function (item) {
                    switch (item) {
                        // this list should match the `filter` list in tags.njk
                        case "all":
                        case "nav":
                        case "post":
                        case "posts":
                            return false;
                    }

                    return true;
                });

                for (const tag of tags) {
                    tagSet.add(tag);
                }
            }
        });

        // returning an array in addCollection works in Eleventy 0.5.3
        return [...tagSet];
    });

    eleventyConfig.addPassthroughCopy("demo");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("svg");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("libs");

    // eleventyConfig.addPassthroughCopy({
    //     "node_modules/@slightlyoff/lite-vimeo/lite-vimeo.js": "/libs/lite-vimeo.js"
    // });

    /* Markdown Overrides */
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    })
        .use(implicitFigures, {
            dataType: false,
            figcaption: false,
            tabindex: false,
            link: false
        })
        .use(embedVimeo)
        .use(embedYouTube)
        .use(embedImgSize)
        .use(mdHeadersPlugin, {
            permalink: true,
            permalinkBefore: true,
            permalinkClass: "is-permalink",
            permalinkSymbol: "#"
        })
        .use(mdLinksPlugin);

    eleventyConfig.setLibrary("md", markdownLibrary);

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                trimCustomFragments: true,
                sortClassName: true,
                sortAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                removeRedundantAttributes: true,
                minifyCSS: true
            });
        }

        return content;
    });

    // Browsersync Overrides
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('_site/404.html');

                browserSync.addMiddleware("*", (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
        ui: false,
        ghostMode: false
    });

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid"
        ],

        // If your site lives in a different subdirectory, change this.
        // Leading or trailing slashes are all normalized away, so don’t worry about those.

        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for link URLs (it does not affect your file structure)
        // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

        // You can also pass this in on the command line using `--pathprefix`
        // pathPrefix: "/",

        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",

        // These are all optional, defaults are shown:
        dir: {
            input: ".",
            layouts: "_layouts",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
