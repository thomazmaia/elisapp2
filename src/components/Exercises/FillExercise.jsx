import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ExerciseFeedback from './ExerciseFeedback';
import styles from './Exercises.module.css';

function Piece({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} className={`${styles.chip} ${isDragging ? styles.dragging : ''}`} {...listeners} {...attributes}>
      {label}
    </button>
  );
}

Piece.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function Blank({ id, piece }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <span ref={setNodeRef} className={`${styles.inlineBlank} ${isOver || piece ? styles.slotActive : ''}`}>
      {piece ? <Piece id={piece.id} label={piece.label} /> : '[___]'}
    </span>
  );
}

Blank.propTypes = {
  id: PropTypes.string.isRequired,
  piece: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

function FillExercise({ exercise, solved, onSolved }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const pieces = useMemo(
    () => exercise.options.map((option, index) => ({ id: `${exercise.id}-${index}`, label: option })),
    [exercise.id, exercise.options],
  );
  const [bank, setBank] = useState(pieces);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(solved ? { status: 'success', message: exercise.successMessage } : null);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const dragged = [...bank, ...Object.values(answers).filter(Boolean)].find((item) => item.id === active.id);
    if (!dragged) return;

    const nextBank = bank.filter((item) => item.id !== active.id);
    const nextAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, value?.id === active.id ? null : value]),
    );

    if (String(over.id).endsWith('-bank')) {
      setBank([...nextBank, dragged]);
      setAnswers(nextAnswers);
      return;
    }

    const blankId = String(over.id).replace(`${exercise.id}-blank-`, '');
    const replaced = nextAnswers[blankId];
    if (replaced) nextBank.push(replaced);
    nextAnswers[blankId] = dragged;
    setBank(nextBank);
    setAnswers(nextAnswers);

    const allFilled = Object.keys(exercise.answers).every((key) => nextAnswers[key]);
    if (allFilled) {
      const isCorrect = Object.entries(exercise.answers).every(
        ([key, value]) => nextAnswers[key]?.label === value,
      );
      if (isCorrect) {
        setFeedback({ status: 'success', message: exercise.successMessage });
        onSolved();
      } else {
        setFeedback({ status: 'warning', message: 'Boa tentativa! Veja se cada pedaco encaixa no lugar certo.' });
      }
    }
  };

  return (
    <div className={styles.exerciseBody}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={styles.codeSentence}>
          {exercise.template.map((part) =>
            part.type === 'text' ? (
              <span key={part.value}>{part.value}</span>
            ) : (
              <Blank key={part.id} id={`${exercise.id}-blank-${part.id}`} piece={answers[part.id]} />
            ),
          )}
        </div>
        <DropZone id={`${exercise.id}-bank`}>
          {bank.map((item) => (
            <Piece key={item.id} id={item.id} label={item.label} />
          ))}
        </DropZone>
      </DndContext>
      <ExerciseFeedback status={feedback?.status || null} message={feedback?.message} />
    </div>
  );
}

function DropZone({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${styles.bank} ${isOver ? styles.slotActive : ''}`}>
      {children}
    </div>
  );
}

DropZone.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FillExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default FillExercise;
