function minifyCSS(cssString) {
    return cssString
        .replace(/\s+/g, ' ')
        .replace(/\/\*.*?\*\//g, '')
        .replace(/\s?([{};:,+>])\s?/g, '$1')
        .trim();
}

module.exports = { minifyCSS };