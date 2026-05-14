import PropTypes from 'prop-types';
import { useState } from 'react';
import ExerciseFeedback from './ExerciseFeedback';

function IdentifyExercise({ exercise, solved, onSolved }) {
  const [status, setStatus] = useState(solved ? 'success' : null);
  const [attempts, setAttempts] = useState(0);
  const [selected, setSelected] = useState(null);

  const pickArea = (areaId) => {
    setSelected(areaId);
    if (areaId === exercise.correctAreaId) {
      setStatus('success');
      onSolved();
    } else {
      setAttempts((count) => count + 1);
      setStatus('warning');
    }
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <strong className="text-lg font-black text-ink">{exercise.prompt}</strong>
        <p className="text-slate-600">{exercise.diagram.title}</p>
      </div>
      <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-gradient-to-br from-pink-100 via-white to-violet-100 shadow-soft">
        {exercise.diagram.areas.map((area) => (
          <button
            key={area.id}
            className={`absolute grid place-items-center rounded-[24px] border-2 text-center font-bold transition ${
              selected === area.id
                ? area.id === exercise.correctAreaId
                  ? 'border-success bg-success/15 text-green-700'
                  : 'border-warning bg-warning/15 text-warning'
                : 'border-primary/20 bg-white/70 text-slate-700'
            }`}
            style={{ left: `${area.x}%`, top: `${area.y}%`, width: `${area.w}%`, height: `${area.h}%` }}
            onClick={() => pickArea(area.id)}
          >
            {area.label}
          </button>
        ))}
      </div>
      <ExerciseFeedback
        status={status}
        message={status === 'success' ? exercise.successMessage : 'Quase la! Tente tocar em outra camada.'}
        showHint={attempts >= 2 && status === 'warning'}
        hint="Pense se a parte pedida fica dentro da borda, sobre a borda ou fora da caixa."
      />
    </div>
  );
}

IdentifyExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default IdentifyExercise;
