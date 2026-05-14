import PropTypes from 'prop-types';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', xml);

function CodeBlock({ code, language = 'css', label = 'Codigo' }) {
  return (
    <div className="grid gap-3">
      <strong className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">{label}</strong>
      <div className="overflow-hidden rounded-[24px] shadow-soft">
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '20px',
            fontFamily: '"Fira Code", monospace',
            fontSize: '15px',
            minHeight: '80px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  label: PropTypes.string,
};

export default CodeBlock;
