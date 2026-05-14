import PropTypes from 'prop-types';
import { useMemo } from 'react';

function HtmlPreview({ htmlContent, cssContent }) {
  const srcDoc = useMemo(
    () => `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100%;
        padding: 20px;
        font-family: Nunito, Arial, sans-serif;
        color: #1f2937;
        background: white;
      }
      img { max-width: 100%; display: block; }
      button, input, select, textarea { font: inherit; }
      ${cssContent}
    </style>
  </head>
  <body>
    ${htmlContent}
  </body>
</html>`,
    [cssContent, htmlContent],
  );

  return (
    <div className="grid gap-3">
      <strong className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">Preview ao vivo</strong>
      <iframe
        title="Preview HTML e CSS"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        className="h-[420px] w-full rounded-[24px] border-0 bg-white shadow-soft"
      />
    </div>
  );
}

HtmlPreview.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  cssContent: PropTypes.string.isRequired,
};

export default HtmlPreview;
