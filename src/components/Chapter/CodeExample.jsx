import PropTypes from 'prop-types';
import VisualPreview from '../UI/VisualPreview';
import styles from './CodeExample.module.css';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const highlightHtml = (code) => {
  const escaped = escapeHtml(code);

  return escaped.replace(
    /(&lt;\/?)([a-zA-Z0-9-]+)(.*?)(\/?&gt;)/g,
    (_, open, tagName, attributes, close) => {
      const highlightedAttributes = attributes.replace(
        /([a-zA-Z-:]+)=(".*?"|'.*?')/g,
        '<span class="attr">$1</span>=<span class="value">$2</span>',
      );

      return `${open}<span class="tag">${tagName}</span>${highlightedAttributes}${close}`;
    },
  );
};

function CodeExample({ code, renderPreview }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.codeBlock}>
        <strong>Codigo HTML</strong>
        <pre
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: highlightHtml(code) }}
        />
      </div>
      {renderPreview ? <VisualPreview html={code} /> : null}
    </div>
  );
}

CodeExample.propTypes = {
  code: PropTypes.string.isRequired,
  renderPreview: PropTypes.bool,
};

export default CodeExample;
