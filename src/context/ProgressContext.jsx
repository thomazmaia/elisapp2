import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import chapters from '../data/chapters';

const STORAGE_KEY = 'elisa-web-3-css-progress';

const ProgressContext = createContext(null);

const defaultProgressState = {
  currentChapterId: 1,
  lastVisitedChapterId: 1,
  completedExercises: {},
  chapterStepIndex: {},
};

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return defaultProgressState;
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) {
      return {
        currentChapterId: saved.currentChapterId || 1,
        lastVisitedChapterId: saved.lastVisitedChapterId || 1,
        completedExercises: saved.completedExercises || {},
        chapterStepIndex: saved.chapterStepIndex || {},
      };
    }
  } catch (error) {
    console.warn('Nao foi possivel ler o progresso salvo.', error);
  }

  return defaultProgressState;
};

export function ProgressProvider({ children }) {
  const [progressState, setProgressState] = useState(getInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
  }, [progressState]);

  const value = useMemo(() => {
    const chapterStatus = chapters.map((chapter) => {
      const completedCount = chapter.exercises.filter(
        (exercise) => progressState.completedExercises[exercise.id],
      ).length;
      const totalCount = chapter.exercises.length;
      const isCompleted = totalCount > 0 && completedCount === totalCount;

      return {
        chapterId: chapter.id,
        completedCount,
        totalCount,
        isCompleted,
        isStarted: completedCount > 0 || progressState.lastVisitedChapterId === chapter.id,
      };
    });

    const completedChapters = chapterStatus.filter((item) => item.isCompleted).length;

    return {
      ...progressState,
      chapterStatus,
      completedChapters,
      totalChapters: chapters.length,
      progressPercent: Math.round((completedChapters / chapters.length) * 100),
      setCurrentChapter(chapterId) {
        setProgressState((current) => ({
          ...current,
          currentChapterId: chapterId,
          lastVisitedChapterId: chapterId,
        }));
      },
      setChapterStepIndex(chapterId, stepIndex) {
        setProgressState((current) => ({
          ...current,
          chapterStepIndex: {
            ...current.chapterStepIndex,
            [chapterId]: stepIndex,
          },
        }));
      },
      markExerciseComplete(exerciseId) {
        setProgressState((current) => ({
          ...current,
          completedExercises: {
            ...current.completedExercises,
            [exerciseId]: true,
          },
        }));
      },
      resetProgress() {
        setProgressState(defaultProgressState);
        window.localStorage.removeItem(STORAGE_KEY);
      },
      isExerciseComplete(exerciseId) {
        return Boolean(progressState.completedExercises[exerciseId]);
      },
    };
  }, [progressState]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error('useProgress precisa estar dentro de ProgressProvider.');
  }

  return context;
}
