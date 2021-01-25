module.exports = (md, opts) => {

    const defaultRender = md.renderer.rules.image;
    const isVimeoRegex = /^https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

    md.renderer.rules.image = function (tokens, idx, options, env, self) {

        const token = tokens[idx];
        const imgSrcAttributeIndex = token.attrIndex('src');
        const imageURL = token.attrs[imgSrcAttributeIndex][1];

        if (isVimeoRegex.test(imageURL)) {

            const videoID = imageURL.match(isVimeoRegex)[2];
            const videoTitle = token.content || '';

            return `<iframe
                        title="${videoTitle}"
                        src="https://player.vimeo.com/video/${videoID}"
                        allowfullscreen
                    ></iframe>`;

        }

        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);

    };

}
