import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ExerciseFeedback from './ExerciseFeedback';

function Piece({ id, label }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      className="rounded-2xl bg-white px-4 py-3 font-code text-sm font-bold shadow-soft"
      {...listeners}
      {...attributes}
    >
      {label}
    </button>
  );
}

Piece.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function Blank({ id, filled }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <span
      ref={setNodeRef}
      className={`mx-1 inline-flex min-h-[48px] min-w-[86px] items-center justify-center rounded-2xl border-2 border-dashed px-2 ${
        isOver || filled ? 'border-primary bg-primary/10 text-primary' : 'border-primary/20 bg-primary/5 text-slate-500'
      }`}
    >
      {filled || '[___]'}
    </span>
  );
}

Blank.propTypes = {
  id: PropTypes.string.isRequired,
  filled: PropTypes.node,
};

function DropBank({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`rounded-[24px] p-4 ${isOver ? 'bg-primary/10' : 'bg-primary/5'}`}>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

DropBank.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function DragDropExercise({ exercise, solved, onSolved }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const options = useMemo(
    () => exercise.pieces.map((item, index) => ({ id: `${exercise.id}-piece-${index}`, label: item })),
    [exercise.id, exercise.pieces],
  );
  const [bank, setBank] = useState(options);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState(solved ? 'success' : null);
  const [attempts, setAttempts] = useState(0);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const dragged = [...bank, ...Object.values(answers).filter(Boolean)].find((item) => item.id === active.id);
    if (!dragged) return;

    const nextBank = bank.filter((item) => item.id !== active.id);
    const nextAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, value?.id === active.id ? null : value]),
    );

    if (over.id === `${exercise.id}-bank`) {
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
      const correct = Object.entries(exercise.answers).every(([key, value]) => nextAnswers[key]?.label === value);
      if (correct) {
        setStatus('success');
        onSolved();
      } else {
        setAttempts((count) => count + 1);
        setStatus('warning');
      }
    }
  };

  const renderedCode = exercise.codeLines
    .map((line) =>
      line.replace(/\[(blank-[^\]]+)\]/g, (_, blankId) => `@@${blankId}@@`),
    )
    .join('\n');

  return (
    <div className="grid gap-5">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="rounded-[26px] bg-slate-950 p-5 shadow-soft">
          <pre className="whitespace-pre-wrap font-code text-[15px] leading-8 text-slate-100">
            {renderedCode.split('@@').map((part, index) =>
              part.startsWith('blank-') ? (
                <Blank
                  key={`${part}-${index}`}
                  id={`${exercise.id}-blank-${part}`}
                  filled={answers[part] ? <Piece id={answers[part].id} label={answers[part].label} /> : null}
                />
              ) : (
                <span key={`${part}-${index}`}>{part}</span>
              ),
            )}
          </pre>
        </div>

        <DropBank id={`${exercise.id}-bank`}>
          {bank.map((item) => (
            <Piece key={item.id} id={item.id} label={item.label} />
          ))}
        </DropBank>
      </DndContext>

      <ExerciseFeedback
        status={status}
        message={status === 'success' ? exercise.successMessage : 'Quase la! Veja qual palavra encaixa melhor.'}
        showHint={attempts >= 2 && status === 'warning'}
        hint="Leia a frase do CSS: propriedade, depois valor."
      />
    </div>
  );
}

DragDropExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default DragDropExercise;
