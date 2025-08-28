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
    outfile: 'dist/bookmarklet.txt',
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

    fs.writeFileSync(`${distDir}/ccc-bookmarklet.html`, htmlContent);
});
