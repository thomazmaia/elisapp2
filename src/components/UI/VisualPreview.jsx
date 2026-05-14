import PropTypes from 'prop-types';
import styles from './VisualPreview.module.css';

function VisualPreview({ html, title = 'Como aparece no navegador 👁️' }) {
  const srcDoc = `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <style>
          body {
            font-family: Nunito, Arial, sans-serif;
            padding: 16px;
            margin: 0;
            color: #1f2a44;
            line-height: 1.45;
          }
          table, th, td {
            border: 1px solid #cbd5e1;
            border-collapse: collapse;
            padding: 8px;
          }
          nav, header, main, aside, section, article, footer {
            padding: 8px;
            border-radius: 10px;
            margin-bottom: 8px;
            background: #eef2ff;
          }
          img {
            max-width: 100%;
            border-radius: 12px;
          }
          a {
            color: #0f766e;
          }
          input, textarea, select, button {
            font: inherit;
            margin-top: 6px;
            padding: 8px 10px;
            border-radius: 10px;
            border: 1px solid #cbd5e1;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `;

  return (
    <div className={styles.wrapper}>
      <strong>{title}</strong>
      <iframe title="Preview visual" className={styles.frame} sandbox="allow-same-origin" srcDoc={srcDoc} />
    </div>
  );
}

VisualPreview.propTypes = {
  html: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default VisualPreview;
