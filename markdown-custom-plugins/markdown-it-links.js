module.exports = (md, opts) => {

    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {

        const hrefAttributeIndex = tokens[idx].attrIndex('href');

        if (hrefAttributeIndex < 0 || !tokens[idx].attrs[hrefAttributeIndex][1].startsWith('#')) {
            tokens[idx].attrPush(['target', '_blank']);
            tokens[idx].attrPush(['rel', 'noreferrer']);
        }

        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
    };

}

