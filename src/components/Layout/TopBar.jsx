import PropTypes from 'prop-types';
import { LayoutGrid, Menu } from 'lucide-react';

function TopBar({ route, currentChapterId, totalChapters, progressPercent, onMenu, onOpenHome, onOpenProgress }) {
  const centerTitle =
    route.page === 'chapter'
      ? `Capitulo ${currentChapterId} de ${totalChapters}`
      : route.page === 'progress'
        ? 'Progresso geral'
        : 'Inicio do modulo CSS';

  return (
    <header className="sticky top-4 z-10 overflow-hidden rounded-[26px] border border-primary/10 bg-white/90 shadow-soft backdrop-blur">
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary/10">
        <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[auto_auto_1fr_auto]">
        <button className="action-button bg-primary/10 px-3 text-primary" onClick={onMenu} aria-label="Abrir menu">
          <Menu size={18} />
        </button>
        <button className="hidden text-left text-lg font-black text-primary lg:block" onClick={onOpenHome}>
          Elisa aprende web 3.0
        </button>
        <div className="truncate text-center text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
          {centerTitle}
        </div>
        <button className="subtle-button px-3" onClick={onOpenProgress}>
          <LayoutGrid size={18} />
          <span className="hidden sm:inline">Progresso</span>
        </button>
      </div>
    </header>
  );
}

TopBar.propTypes = {
  route: PropTypes.object.isRequired,
  currentChapterId: PropTypes.number.isRequired,
  totalChapters: PropTypes.number.isRequired,
  progressPercent: PropTypes.number.isRequired,
  onMenu: PropTypes.func.isRequired,
  onOpenHome: PropTypes.func.isRequired,
  onOpenProgress: PropTypes.func.isRequired,
};

export default TopBar;
