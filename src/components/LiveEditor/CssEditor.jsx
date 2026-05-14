import PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';

function CssEditor({ value, onChange }) {
  return (
    <div className="overflow-hidden rounded-[24px] shadow-soft">
      <CodeMirror
        value={value}
        extensions={[css()]}
        height="320px"
        theme="dark"
        basicSetup={{ lineNumbers: true, foldGutter: false }}
        onChange={onChange}
      />
    </div>
  );
}

CssEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CssEditor;
