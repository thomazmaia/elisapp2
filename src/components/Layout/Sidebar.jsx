import PropTypes from 'prop-types';
import { BookOpen, Home, LayoutGrid, X } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

function Sidebar({ isOpen, chapters, currentChapterId, route, onNavigate, onClose }) {
  const { chapterStatus } = useProgress();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-ink/30 transition lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[260px] overflow-y-auto border-r border-primary/10 bg-white/95 px-4 py-5 shadow-soft backdrop-blur transition lg:sticky lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Elisa aprende</p>
            <h2 className="text-2xl font-black text-ink">Modulo CSS</h2>
          </div>
          <button className="action-button bg-primary/10 px-3 lg:hidden" onClick={onClose} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-2">
          <button
            className={`action-button justify-start ${route.page === 'home' ? 'bg-primary/15 text-primary' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => {
              onNavigate({ page: 'home' });
              onClose();
            }}
          >
            <Home size={18} />
            Inicio
          </button>
          <button
            className={`action-button justify-start ${route.page === 'progress' ? 'bg-primary/15 text-primary' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => {
              onNavigate({ page: 'progress' });
              onClose();
            }}
          >
            <LayoutGrid size={18} />
            Progresso
          </button>
        </div>

        <div className="mt-5 grid gap-2">
          {chapters.map((chapter) => {
            const status = chapterStatus.find((item) => item.chapterId === chapter.id);
            const active = currentChapterId === chapter.id && route.page === 'chapter';

            return (
              <button
                key={chapter.id}
                className={`flex min-h-[64px] items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  active ? 'bg-primary/15 text-primary' : 'bg-transparent text-slate-700 hover:bg-slate-100'
                }`}
                onClick={() => {
                  onNavigate({ page: 'chapter', slug: chapter.slug });
                  onClose();
                }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
                  {status?.isCompleted ? '✅' : chapter.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate text-base font-extrabold">Cap. {chapter.id}</strong>
                  <span className="block truncate text-sm text-slate-500">{chapter.title}</span>
                </span>
                <BookOpen size={18} />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  chapters: PropTypes.array.isRequired,
  currentChapterId: PropTypes.number.isRequired,
  route: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
