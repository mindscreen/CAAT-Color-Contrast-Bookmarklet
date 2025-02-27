import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import { minifyCSS } from "./minifyCSS.js";

/**
 * @param {Record<string, (original: string, ...args: string[]) => string>} options
 * @returns {esbuild.Plugin}
 */
const bookmarkletPlugin = options => ({
    name: 'bookmarkletPlugin',
    setup(build) {
        build.onLoad({ filter: /\.(tsx|js)$/ }, async args => {
            let code = await fs.promises.readFile(args.path, 'utf8');

            const cssRegex = /css`([^`]+)`/g;
            let match;
            let newCode = code;

            while ((match = cssRegex.exec(code)) !== null) {
                const originalCSS = match[1];
                const minifiedCSS = minifyCSS(originalCSS);
                newCode = newCode.replace(originalCSS, minifiedCSS);
            }

            return {
                loader: 'tsx',
                contents: newCode,
            };
        });
        build.onEnd(async (result) => {
            const { outputFiles } = result;
            if (!outputFiles) return;

            for (const file of outputFiles) {
                const outputBuffer = file.contents;
                const utf8Decoder = new TextDecoder();
                const outputContent = utf8Decoder.decode(outputBuffer);
                file.contents = Buffer.concat([
                    Buffer.from('javascript:', 'utf8'),
                    Buffer.from(encodeURI(outputContent), 'utf8'),
                ]);
            }
        });
    }
});

const distDir = 'dist';
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

await esbuild.build({
    entryPoints: ['src/bookmarklet.js'],
    bundle: true,
    minify: true,
    outfile: 'dist/bookmarkletConverted.js',
    write: false,
    plugins: [
        bookmarkletPlugin()
    ]
}).then(result => {
    let bookmarkletCode = '';
    for (const file of result.outputFiles) {
        fs.writeFileSync(file.path, file.contents);
        bookmarkletCode = file.contents.toString();
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CAAT Color Contrast Checker Bookmarklet</title>
        </head>
        <body>
            <h1>CAAT Color Contrast Checker</h1>
            <p>Drag the button below to your bookmarks bar to install the bookmarklet:</p>
            <a href="${bookmarkletCode}" title="Drag this to your bookmarks bar">CAAT Contrast Checker</a>
        </body>
        </html>
    `;

    fs.writeFileSync(`${distDir}/ccc-bookmarklet.html`, htmlContent);
});
