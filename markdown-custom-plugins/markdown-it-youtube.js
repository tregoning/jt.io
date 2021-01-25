module.exports = (md, opts) => {

    const defaultRender = md.renderer.rules.image;
    const isYoutubeRegex = /https?:\/\/(?:www\.)?youtube.com\/(?:embed|watch)(?:\/|\?v=)([a-zA-Z0-9_-]{11})/;

    md.renderer.rules.image = function (tokens, idx, options, env, self) {

        const token = tokens[idx];
        const imgSrcAttributeIndex = token.attrIndex('src');
        const imageURL = token.attrs[imgSrcAttributeIndex][1];

        if (isYoutubeRegex.test(imageURL)) {

            const videoID = imageURL.match(isYoutubeRegex)[1];
            const videoTitle = token.content || '';

            return `<iframe
                        title="${videoTitle}"
                        src="https://www.youtube.com/embed/${videoID}?rel=0&showinfo=0"
                        allowfullscreen
                    ></iframe>`;

        }

        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);

    };

}
