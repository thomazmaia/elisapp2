import PropTypes from 'prop-types';

function ElisaCard({ chapter }) {
  return (
    <section className="rounded-[30px] border-2 border-primary/20 bg-violet-100/70 p-6 shadow-soft">
      <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:items-center">
        <div className="grid gap-3">
          <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
            Capitulo {chapter.id}
          </span>
          <h1 className="text-4xl font-black text-ink">
            {chapter.emoji} {chapter.title}
          </h1>
          <h2 className="text-2xl font-extrabold text-primary">{chapter.forElisa.headline}</h2>
          <p className="max-w-2xl text-lg font-bold text-slate-700">{chapter.forElisa.description}</p>
          <div className="rounded-3xl bg-white/80 p-4 text-base font-bold text-slate-600">
            Metafora visual: {chapter.forElisa.metaphor}
          </div>
        </div>
        <div className="grid min-h-[220px] place-items-center rounded-[28px] bg-gradient-to-br from-white via-violet-50 to-pink-100 p-6">
          <div className="grid place-items-center gap-3">
            <span className="text-7xl">{chapter.emoji}</span>
            <strong className="text-center text-lg font-black text-primary">{chapter.forElisa.headline}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

ElisaCard.propTypes = {
  chapter: PropTypes.object.isRequired,
};

export default ElisaCard;
