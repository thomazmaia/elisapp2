import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import ConceptSection from './ConceptSection';
import InterpreterBox from './InterpreterBox';
import ElisaCard from './ElisaCard';
import BuildExercise from '../Exercises/BuildExercise';
import DragDropExercise from '../Exercises/DragDropExercise';
import MatchExercise from '../Exercises/MatchExercise';
import PredictExercise from '../Exercises/PredictExercise';
import IdentifyExercise from '../Exercises/IdentifyExercise';
import MatchPreviewExercise from '../Exercises/MatchPreviewExercise';

const exerciseComponents = {
  'drag-drop-build': BuildExercise,
  'fill-blank': DragDropExercise,
  match: MatchExercise,
  predict: PredictExercise,
  identify: IdentifyExercise,
  'match-preview': MatchPreviewExercise,
};

function ChapterPage({ chapter, nextChapter, onBackHome, onOpenChapter }) {
  const { chapterStepIndex, setChapterStepIndex, isExerciseComplete, markExerciseComplete } = useProgress();
  const chapterCompleted = chapter.exercises.every((exercise) => isExerciseComplete(exercise.id));

  const steps = useMemo(
    () => [
      ...chapter.concepts.map((concept) => ({ id: concept.id, kind: 'concept', payload: concept })),
      ...chapter.exercises.map((exercise) => ({ id: exercise.id, kind: 'exercise', payload: exercise })),
      { id: `${chapter.slug}-finish`, kind: 'finish', payload: null },
    ],
    [chapter.concepts, chapter.exercises, chapter.slug],
  );

  const initialStep = Math.min(chapterStepIndex[chapter.id] || 0, steps.length - 1);
  const [stepIndex, setStepIndex] = useState(initialStep);

  useEffect(() => {
    setStepIndex(Math.min(chapterStepIndex[chapter.id] || 0, steps.length - 1));
  }, [chapter.id, chapterStepIndex, steps.length]);

  useEffect(() => {
    setChapterStepIndex(chapter.id, stepIndex);
  }, [chapter.id, setChapterStepIndex, stepIndex]);

  const activeStep = steps[stepIndex];
  const isExerciseStep = activeStep.kind === 'exercise';
  const ExerciseComponent = isExerciseStep ? exerciseComponents[activeStep.payload.type] : null;
  const stepSolved = isExerciseStep ? isExerciseComplete(activeStep.payload.id) : false;

  const goNext = () => {
    if (stepIndex < steps.length - 1) {
      if (activeStep.kind === 'exercise' && !stepSolved) return;
      if (activeStep.kind === 'finish' && nextChapter) {
        onOpenChapter(nextChapter.slug);
        return;
      }
      setStepIndex((current) => current + 1);
    }
  };

  const goPrev = () => {
    if (stepIndex > 0) setStepIndex((current) => current - 1);
  };

  const handleSolved = () => {
    if (isExerciseStep) {
      markExerciseComplete(activeStep.payload.id);
    }
  };

  return (
    <div className="grid gap-6">
      <button className="subtle-button w-fit" onClick={onBackHome}>
        <ArrowLeft size={18} />
        Voltar para inicio
      </button>

      <ElisaCard chapter={chapter} />
      <InterpreterBox text={chapter.forInterpreter} />

      <section className="panel-card grid gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">Dentro do capitulo</p>
            <h2 className="text-3xl font-black text-ink">
              Passo {stepIndex + 1} de {steps.length}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const done =
                step.kind === 'exercise'
                  ? isExerciseComplete(step.payload.id)
                  : index < stepIndex || (step.kind === 'finish' && chapterCompleted);

              return (
                <button
                  key={step.id}
                  className={`h-4 w-4 rounded-full transition ${
                    index === stepIndex ? 'bg-primary' : done ? 'bg-success' : 'bg-primary/20'
                  }`}
                  onClick={() => {
                    if (step.kind !== 'finish' || chapterCompleted) {
                      setStepIndex(index);
                    }
                  }}
                  aria-label={`Ir para passo ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="grid gap-5"
          >
            {activeStep.kind === 'concept' ? <ConceptSection concept={activeStep.payload} /> : null}

            {activeStep.kind === 'exercise' && ExerciseComponent ? (
              <section className="grid gap-4 rounded-[30px] bg-white/90 p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="grid gap-2">
                    <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-secondary">Exercicio</p>
                    <h3 className="text-2xl font-black text-ink">{activeStep.payload.instruction}</h3>
                    <p className="text-slate-600">Veja o efeito visual e experimente sem pressa.</p>
                  </div>
                  {stepSolved ? (
                    <span className="flex items-center gap-2 rounded-full bg-success/15 px-4 py-2 text-sm font-extrabold text-green-700">
                      <CheckCircle2 size={18} />
                      Concluido
                    </span>
                  ) : null}
                </div>
                <ExerciseComponent exercise={activeStep.payload} solved={stepSolved} onSolved={handleSolved} />
              </section>
            ) : null}

            {activeStep.kind === 'finish' ? (
              <section className="grid gap-5 rounded-[30px] bg-white/90 p-6 shadow-soft">
                <div className="grid gap-3">
                  <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-success">Resumo final</p>
                  <h3 className="text-3xl font-black text-ink">Capitulo concluido</h3>
                  <p className="text-slate-600">
                    {chapterCompleted
                      ? 'Muito bem! Voce terminou os exercicios deste capitulo.'
                      : 'Falta concluir todos os exercicios para fechar este capitulo.'}
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {chapter.concepts.map((concept) => (
                    <div key={concept.id} className="rounded-[24px] bg-primary/5 p-4">
                      <strong className="text-lg font-black text-primary">{concept.title}</strong>
                      <p className="mt-2 text-sm font-bold text-slate-600">{concept.forInterpreter}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button className="subtle-button" onClick={goPrev} disabled={stepIndex === 0}>
            <ArrowLeft size={18} />
            Passo anterior
          </button>
          <button
            className={`action-button ${
              activeStep.kind === 'exercise' && !stepSolved
                ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                : activeStep.kind === 'finish' && !chapterCompleted
                  ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                  : 'bg-primary text-white'
            }`}
            onClick={goNext}
            disabled={(activeStep.kind === 'exercise' && !stepSolved) || (activeStep.kind === 'finish' && !chapterCompleted)}
          >
            {activeStep.kind === 'finish' ? (nextChapter ? 'Proximo capitulo' : 'Modulo completo') : 'Proximo'}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

ChapterPage.propTypes = {
  chapter: PropTypes.object.isRequired,
  nextChapter: PropTypes.object,
  onBackHome: PropTypes.func.isRequired,
  onOpenChapter: PropTypes.func.isRequired,
};

export default ChapterPage;
