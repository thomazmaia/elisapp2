import PropTypes from 'prop-types';
import styles from './TagPill.module.css';

const colors = [
  { match: /(html|head|title|body)/i, color: '#6366F1' },
  { match: /(p|h1|h2|h3|h4|h5|h6|br)/i, color: '#0EA5E9' },
  { match: /(b|i|u)/i, color: '#EC4899' },
  { match: /(ol|ul|li)/i, color: '#F59E0B' },
  { match: /(a|href|target)/i, color: '#10B981' },
  { match: /(img|figure|figcaption|src|alt)/i, color: '#8B5CF6' },
  { match: /(table|thead|tbody|tfoot|tr|th|td|colspan|rowspan)/i, color: '#EF4444' },
  { match: /(form|input|textarea|select|option|label|placeholder|required|name)/i, color: '#14B8A6' },
];

function TagPill({ tag }) {
  if (!tag) return null;
  const tagColor = colors.find((item) => item.match.test(tag))?.color || '#4F46E5';

  return (
    <span className={styles.pill} style={{ backgroundColor: `${tagColor}22`, color: tagColor }}>
      {tag}
    </span>
  );
}

TagPill.propTypes = {
  tag: PropTypes.string,
};

export default TagPill;
