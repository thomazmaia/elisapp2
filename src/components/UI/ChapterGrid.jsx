import PropTypes from 'prop-types';

function ChapterGrid({ chapters, chapterStatus, onOpenChapter, showExerciseCount = false }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {chapters.map((chapter) => {
        const status = chapterStatus.find((item) => item.chapterId === chapter.id);
        return (
          <button
            key={chapter.id}
            className="panel-card grid gap-4 p-5 text-left transition hover:-translate-y-1"
            onClick={() => onOpenChapter(chapter.slug)}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-white text-3xl shadow-soft">
                {chapter.emoji}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600">
                {status?.isCompleted ? '✅ Concluido' : status?.completedCount ? '🟡 Em progresso' : '⚪ Nao iniciado'}
              </span>
            </div>

            <div className="grid gap-1">
              <strong className="text-xl font-black text-ink">
                Capitulo {chapter.id}
              </strong>
              <span className="text-slate-700">{chapter.title}</span>
              <p className="text-sm text-slate-500">{chapter.forElisa.headline}</p>
            </div>

            {showExerciseCount ? (
              <small className="text-sm font-bold text-slate-500">
                {status?.completedCount || 0}/{status?.totalCount || 0} exercicios
              </small>
            ) : null}
          </button>
        );
      })}
    </section>
  );
}

ChapterGrid.propTypes = {
  chapters: PropTypes.array.isRequired,
  chapterStatus: PropTypes.array.isRequired,
  onOpenChapter: PropTypes.func.isRequired,
  showExerciseCount: PropTypes.bool,
};

export default ChapterGrid;
