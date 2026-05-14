import PropTypes from 'prop-types';
import TagPill from '../UI/TagPill';
import CodeExample from './CodeExample';
import styles from './ConceptCard.module.css';

function ConceptCard({ concept }) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <TagPill tag={concept.tag} />
        <h3>{concept.name}</h3>
      </div>
      <p className={styles.description}>{concept.description}</p>
      <CodeExample code={concept.visualExample} renderPreview={concept.renderPreview} />
    </article>
  );
}

ConceptCard.propTypes = {
  concept: PropTypes.shape({
    tag: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    visualExample: PropTypes.string.isRequired,
    renderPreview: PropTypes.bool,
  }).isRequired,
};

export default ConceptCard;
