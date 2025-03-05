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
            <link rel="stylesheet" href="style.css"/>
            <title>CAAT Color Contrast Checker Bookmarklet</title>
        </head>
        <body>
            <main class="row">
                <h1>CAAT-Color-Contrast-Checker</h1>
                <h2>Bookmark Color Contrast Calculation Tool</h2>
                <ol>
                    <li>Activate the bookmark toolbar in your browser (if not active yet). Most Browsers allow this by pressing Ctrl+Shift+B.</li>
                    <li>Drag & drop the link <a href="${bookmarkletCode}">CAAT Contrast Checker</a> to the bookmark toolbar.</li>
                    <li>Activate the bookmarklet on any page.</li>
                    <li>Use the pipette to transfer color values or enter them manually into the fields to determine the color contrast.</li>
                </ol>
            </main>
        </body>
        </html>
    `;

    const cssStyle = `
        html, body {
            margin: 0;
            padding: 0;
            background-color: #fff;
        }
        .row {
            margin: 0 auto;
            max-width: 45rem;
            padding: 0 1rem;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
            font-weight: 700;
            color: #111;
        }
        h1 {
            line-height: 1.2;
            font-size: 2rem;
            margin-bottom: 0;
        }
        @media screen and (min-width: 45em) {
            h1 {
                font-size: 3rem;
            }
        }
        h2 {
            line-height: 1.2;
            font-size: 1.5rem;
        }
        p, li {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
            color: #333;
            line-height: 1.6;
            font-size: 1.4rem;
        }
        p {
            margin: 0 0 1rem 0;
        }
        li {
            margin: 0 0 1rem 0;
        }
        ul, ol {
            margin: 0 0 1rem 2rem;
            padding: 0;
            list-style-position: outside;
        }
        a {
            color: #D7090E;
        }
        a:hover, a:focus {
            color: #fff;
            background-color: #ce171e;
            border-top: 3px solid #ce171e;
            text-decoration: none;
            outline: none;
        }
    `;

    fs.writeFileSync(`${distDir}/ccc-bookmarklet.html`, htmlContent);
    fs.writeFileSync(`${distDir}/style.css`, cssStyle);
});
