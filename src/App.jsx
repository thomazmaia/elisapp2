import { useEffect, useMemo, useState } from 'react';
import AppShell from './components/Layout/AppShell';
import ChapterPage from './components/Chapter/ChapterPage';
import ChapterGrid from './components/UI/ChapterGrid';
import ProgressBadge from './components/UI/ProgressBadge';
import chapters from './data/chapters';
import { useProgress } from './context/ProgressContext';

const getRouteFromHash = () => {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash || hash === '/') return { page: 'home' };
  if (hash === '/progress') return { page: 'progress' };
  if (hash.startsWith('/chapter/')) {
    return { page: 'chapter', slug: hash.replace('/chapter/', '') };
  }
  return { page: 'home' };
};

function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const {
    chapterStatus,
    completedChapters,
    totalChapters,
    progressPercent,
    lastVisitedChapterId,
    setCurrentChapter,
    resetProgress,
  } = useProgress();

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextRoute) => {
    if (nextRoute.page === 'home') window.location.hash = '/';
    if (nextRoute.page === 'progress') window.location.hash = '/progress';
    if (nextRoute.page === 'chapter') window.location.hash = `/chapter/${nextRoute.slug}`;
  };

  const currentChapter = useMemo(() => {
    if (route.page === 'chapter') {
      return chapters.find((chapter) => chapter.slug === route.slug) || chapters[0];
    }

    return chapters.find((chapter) => chapter.id === lastVisitedChapterId) || chapters[0];
  }, [route.page, route.slug, lastVisitedChapterId]);

  useEffect(() => {
    if (route.page === 'chapter') {
      setCurrentChapter(currentChapter.id);
    }
  }, [currentChapter.id, route.page, setCurrentChapter]);

  return (
    <AppShell
      route={route}
      chapters={chapters}
      currentChapterId={currentChapter.id}
      progressPercent={progressPercent}
      onNavigate={navigate}
    >
      {route.page === 'chapter' ? (
        <ChapterPage
          chapter={currentChapter}
          nextChapter={chapters.find((item) => item.id === currentChapter.id + 1) || null}
          onBackHome={() => navigate({ page: 'home' })}
          onOpenChapter={(slug) => navigate({ page: 'chapter', slug })}
        />
      ) : route.page === 'progress' ? (
        <ProgressScreen
          chapters={chapters}
          chapterStatus={chapterStatus}
          completedChapters={completedChapters}
          totalChapters={totalChapters}
          progressPercent={progressPercent}
          onOpenChapter={(slug) => navigate({ page: 'chapter', slug })}
        />
      ) : (
        <HomeScreen
          chapters={chapters}
          chapterStatus={chapterStatus}
          continueChapter={currentChapter}
          completedChapters={completedChapters}
          totalChapters={totalChapters}
          progressPercent={progressPercent}
          onContinue={() => navigate({ page: 'chapter', slug: currentChapter.slug })}
          onStartFromBeginning={() => navigate({ page: 'chapter', slug: chapters[0].slug })}
          onOpenChapter={(slug) => navigate({ page: 'chapter', slug })}
          onOpenProgress={() => navigate({ page: 'progress' })}
          onReset={() => {
            const confirmed = window.confirm('Apagar todo o progresso do modulo CSS e recomecar?');
            if (confirmed) {
              resetProgress();
              navigate({ page: 'home' });
            }
          }}
        />
      )}
    </AppShell>
  );
}

function HomeScreen({
  chapters,
  chapterStatus,
  continueChapter,
  completedChapters,
  totalChapters,
  progressPercent,
  onContinue,
  onStartFromBeginning,
  onOpenChapter,
  onOpenProgress,
  onReset,
}) {
  return (
    <div className="grid gap-6">
      <section className="panel-card grid gap-6 overflow-hidden p-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-5">
          <span className="w-fit rounded-full bg-secondary/10 px-4 py-2 text-sm font-extrabold text-secondary">
            Modulo 2 • CSS
          </span>
          <div className="grid gap-3">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-primary">Novo modulo visual</p>
            <h1 className="text-4xl font-black text-ink lg:text-5xl">Elisa aprende web 3.0 — Modulo CSS</h1>
            <p className="max-w-2xl text-lg font-bold text-slate-600">
              Ola, Elisa! Agora vamos aprender CSS! 🎨
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="primary-button" onClick={onContinue}>
              Continuar de onde parei
            </button>
            <button className="subtle-button" onClick={onStartFromBeginning}>
              Comecar do inicio
            </button>
            <button className="action-button bg-warning/15 text-warning" onClick={onReset}>
              Reiniciar progresso
            </button>
          </div>
          <div className="grid gap-2 rounded-3xl bg-primary/5 p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Ponto atual</p>
            <p className="text-xl font-extrabold text-ink">
              Capitulo {continueChapter.id} — {continueChapter.title}
            </p>
          </div>
        </div>

        <div className="relative grid min-h-[280px] place-items-center rounded-[30px] bg-gradient-to-br from-violet-100 via-white to-pink-100 p-6">
          <div className="absolute left-8 top-10 rounded-3xl bg-white px-5 py-4 shadow-soft">
            <span className="text-4xl">📄</span>
            <p className="mt-2 text-sm font-extrabold text-slate-500">HTML</p>
          </div>
          <div className="rounded-full bg-primary/10 p-8 text-7xl shadow-soft">🎨</div>
          <div className="absolute bottom-10 right-8 rounded-3xl bg-white px-5 py-4 shadow-soft">
            <span className="text-4xl">✨</span>
            <p className="mt-2 text-sm font-extrabold text-slate-500">CSS muda o visual</p>
          </div>
        </div>
      </section>

      <section className="panel-card flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl font-black text-ink">Seu progresso geral</h2>
          <p className="text-slate-600">
            {completedChapters} de {totalChapters} capitulos concluidos
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ProgressBadge completed={completedChapters} total={totalChapters} percent={progressPercent} />
          <button className="subtle-button" onClick={onOpenProgress}>
            Ver tela de progresso
          </button>
        </div>
      </section>

      <ChapterGrid chapters={chapters} chapterStatus={chapterStatus} onOpenChapter={onOpenChapter} />
    </div>
  );
}

function ProgressScreen({ chapters, chapterStatus, completedChapters, totalChapters, progressPercent, onOpenChapter }) {
  return (
    <div className="grid gap-6">
      <section className="panel-card grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="grid gap-2">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Resumo visual</p>
          <h1 className="text-4xl font-black text-ink">Seu caminho no modulo CSS</h1>
          <p className="text-slate-600">
            {completedChapters} de {totalChapters} capitulos concluidos — {progressPercent}%
          </p>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <ProgressBadge completed={completedChapters} total={totalChapters} percent={progressPercent} large />
      </section>

      <ChapterGrid chapters={chapters} chapterStatus={chapterStatus} onOpenChapter={onOpenChapter} showExerciseCount />
    </div>
  );
}

export default App;
