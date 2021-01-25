module.exports = (md, opts) => {

    const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

    md.renderer.rules.fence = (tokens, idx, opts, env, self) => {

        const token = tokens[idx];

        if (token.info === 'chart') {

            try {

                const chartData = JSON.parse(token.content);
                return `<web-chart data-options=${JSON.stringify(chartData)}></web-chart>`

            } catch (err) {

                console.error(err);
                return `<pre>${err.message || err.name}</pre>`

            }

        }

        return defaultRenderer(tokens, idx, opts, env, self)

    }

}
