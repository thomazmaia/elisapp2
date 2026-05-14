import PropTypes from 'prop-types';

const getStyles = (label = '') => {
  if (/font|text|line-height|letter-spacing/i.test(label)) return 'bg-sky-100 text-sky-700';
  if (/padding|margin|border/i.test(label)) return 'bg-amber-100 text-amber-700';
  if (/width|height|min|max|display/i.test(label)) return 'bg-emerald-100 text-emerald-700';
  if (/position|top|left|right|bottom|z-index/i.test(label)) return 'bg-rose-100 text-rose-700';
  if (/color|background/i.test(label)) return 'bg-gradient-to-r from-pink-100 via-orange-100 to-sky-100 text-pink-700';
  return 'bg-violet-100 text-violet-700';
};

function CssPill({ label }) {
  return <span className={`inline-flex rounded-full px-3 py-2 font-code text-sm font-bold ${getStyles(label)}`}>{label}</span>;
}

CssPill.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CssPill;
