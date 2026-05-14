import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ExerciseFeedback from './ExerciseFeedback';

function MatchTag({ id, label }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <button ref={setNodeRef} style={style} className="rounded-2xl bg-white px-4 py-3 font-code text-sm font-bold shadow-soft" {...listeners} {...attributes}>
      {label}
    </button>
  );
}

MatchTag.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function MatchZone({ id, preview, item }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`grid gap-3 rounded-[24px] border-2 border-dashed p-4 ${isOver ? 'border-primary bg-primary/10' : 'border-primary/20 bg-white'}`}>
      <span className="font-bold text-slate-700">{preview}</span>
      {item ? <MatchTag id={item.id} label={item.label} /> : <span className="text-sm font-bold text-slate-400">Arraste aqui</span>}
    </div>
  );
}

MatchZone.propTypes = {
  id: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  item: PropTypes.object,
};

function MatchBank({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`rounded-[24px] p-4 ${isOver ? 'bg-primary/10' : 'bg-primary/5'}`}>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

MatchBank.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function MatchExercise({ exercise, solved, onSolved }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const items = useMemo(
    () => exercise.pairs.map((pair) => ({ id: `${exercise.id}-${pair.id}`, label: pair.label, pairId: pair.id })),
    [exercise.id, exercise.pairs],
  );
  const [bank, setBank] = useState(items);
  const [matches, setMatches] = useState({});
  const [status, setStatus] = useState(solved ? 'success' : null);
  const [attempts, setAttempts] = useState(0);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const dragged = [...bank, ...Object.values(matches).filter(Boolean)].find((item) => item.id === active.id);
    if (!dragged) return;

    const nextBank = bank.filter((item) => item.id !== active.id);
    const nextMatches = Object.fromEntries(
      Object.entries(matches).map(([key, value]) => [key, value?.id === active.id ? null : value]),
    );

    if (over.id === `${exercise.id}-bank`) {
      setBank([...nextBank, dragged]);
      setMatches(nextMatches);
      return;
    }

    const targetId = String(over.id).replace(`${exercise.id}-target-`, '');
    const replaced = nextMatches[targetId];
    if (replaced) nextBank.push(replaced);
    nextMatches[targetId] = dragged;

    setBank(nextBank);
    setMatches(nextMatches);

    const allFilled = exercise.pairs.every((pair) => nextMatches[pair.id]);
    if (allFilled) {
      const correct = exercise.pairs.every((pair) => nextMatches[pair.id]?.pairId === pair.id);
      if (correct) {
        setStatus('success');
        onSolved();
      } else {
        setAttempts((count) => count + 1);
        setStatus('warning');
      }
    }
  };

  return (
    <div className="grid gap-5">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <MatchBank id={`${exercise.id}-bank`}>
            {bank.map((item) => (
              <MatchTag key={item.id} id={item.id} label={item.label} />
            ))}
          </MatchBank>
          <div className="grid gap-3">
            {exercise.pairs.map((pair) => (
              <MatchZone key={pair.id} id={`${exercise.id}-target-${pair.id}`} preview={pair.preview} item={matches[pair.id]} />
            ))}
          </div>
        </div>
      </DndContext>

      <ExerciseFeedback
        status={status}
        message={status === 'success' ? exercise.successMessage : 'Quase la! Repare no efeito visual de cada propriedade.'}
        showHint={attempts >= 2 && status === 'warning'}
        hint="Pense em qual propriedade muda cor, tamanho, borda ou posicao."
      />
    </div>
  );
}

MatchExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default MatchExercise;
