import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import HtmlPreview from '../LiveEditor/HtmlPreview';
import ExerciseFeedback from './ExerciseFeedback';

function DraggableToken({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={`rounded-2xl bg-white px-4 py-3 font-code text-sm font-bold shadow-soft ${isDragging ? 'opacity-70' : ''}`}
      {...listeners}
      {...attributes}
    >
      {label}
    </button>
  );
}

DraggableToken.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function DroppableArea({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[70px] rounded-[22px] border-2 border-dashed p-3 ${
        isOver ? 'border-primary bg-primary/10' : 'border-primary/20 bg-primary/5'
      }`}
    >
      {children}
    </div>
  );
}

DroppableArea.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function BuildExercise({ exercise, solved, onSolved }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const baseItems = useMemo(
    () => exercise.pieces.map((item, index) => ({ id: `${exercise.id}-piece-${index}`, label: item })),
    [exercise.id, exercise.pieces],
  );
  const [bank, setBank] = useState(baseItems);
  const [slots, setSlots] = useState(Array(exercise.answer.length).fill(null));
  const [status, setStatus] = useState(solved ? 'success' : null);
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = (nextSlots) => {
    if (nextSlots.every(Boolean)) {
      const values = nextSlots.map((item) => item.label);
      const correct = values.join('|') === exercise.answer.join('|');
      if (correct) {
        setStatus('success');
        onSolved();
      } else {
        setAttempts((count) => count + 1);
        setStatus('warning');
      }
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const dragged = [...bank, ...slots.filter(Boolean)].find((item) => item.id === active.id);
    if (!dragged) return;

    let nextBank = bank.filter((item) => item.id !== active.id);
    const nextSlots = slots.map((item) => (item?.id === active.id ? null : item));

    if (over.id === `${exercise.id}-bank`) {
      nextBank = [...nextBank, dragged];
      setBank(nextBank);
      setSlots(nextSlots);
      return;
    }

    const slotIndex = Number(String(over.id).replace(`${exercise.id}-slot-`, ''));
    if (Number.isNaN(slotIndex)) return;

    const replaced = nextSlots[slotIndex];
    if (replaced) nextBank = [...nextBank, replaced];
    nextSlots[slotIndex] = dragged;

    setBank(nextBank);
    setSlots(nextSlots);
    checkAnswer(nextSlots);
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          <strong className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">Resultado visual</strong>
          <HtmlPreview htmlContent={exercise.preview} cssContent="" />
        </div>

        <div className="grid gap-3">
          <strong className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">Monte a declaracao</strong>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="rounded-[26px] bg-slate-950 p-5 text-white shadow-soft">
              <p className="mb-4 font-code text-sm text-slate-300">{exercise.selector} {'{'}</p>
              <div className="grid gap-3">
                {slots.map((slot, index) => (
                  <DroppableArea key={`${exercise.id}-slot-${index}`} id={`${exercise.id}-slot-${index}`}>
                    {slot ? <DraggableToken id={slot.id} label={slot.label} /> : <span className="font-code text-slate-400">[___]</span>}
                  </DroppableArea>
                ))}
              </div>
              <p className="mt-4 font-code text-sm text-slate-300">{'}'}</p>
            </div>
            <DroppableArea id={`${exercise.id}-bank`}>
              <div className="flex flex-wrap gap-3">
                {bank.map((item) => (
                  <DraggableToken key={item.id} id={item.id} label={item.label} />
                ))}
              </div>
            </DroppableArea>
          </DndContext>
        </div>
      </div>

      <ExerciseFeedback
        status={status}
        message={status === 'success' ? exercise.successMessage : 'Quase la! Tente outra combinacao.'}
        showHint={attempts >= 2 && status === 'warning'}
        hint="A declaracao precisa seguir a ordem: propriedade, dois-pontos, valor e ponto-e-virgula."
      />
    </div>
  );
}

BuildExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default BuildExercise;
