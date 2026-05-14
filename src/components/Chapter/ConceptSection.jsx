import PropTypes from 'prop-types';
import CodeBlock from './CodeBlock';
import LivePanel from '../LiveEditor/LivePanel';

function ConceptSection({ concept }) {
  return (
    <section className="grid gap-5 rounded-[30px] bg-white/90 p-6 shadow-soft">
      <div className="grid gap-3">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">Conceito</p>
        <h3 className="text-3xl font-black text-ink">{concept.title}</h3>
        <p className="rounded-3xl bg-yellow-100/80 p-4 text-[15px] font-bold leading-7 text-yellow-900">
          👤 {concept.forInterpreter}
        </p>
      </div>

      <CodeBlock code={concept.codeExample} language="css" label="Exemplo CSS" />
      <LivePanel panel={concept.livePanel} />
    </section>
  );
}

ConceptSection.propTypes = {
  concept: PropTypes.object.isRequired,
};

export default ConceptSection;
