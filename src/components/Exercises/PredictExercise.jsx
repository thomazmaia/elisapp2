import PropTypes from 'prop-types';
import { useState } from 'react';
import CodeBlock from '../Chapter/CodeBlock';
import HtmlPreview from '../LiveEditor/HtmlPreview';
import ExerciseFeedback from './ExerciseFeedback';

function PredictExercise({ exercise, solved, onSolved }) {
  const [status, setStatus] = useState(solved ? 'success' : null);
  const [attempts, setAttempts] = useState(0);

  const handlePick = (optionId) => {
    if (optionId === exercise.correctOptionId) {
      setStatus('success');
      onSolved();
    } else {
      setAttempts((count) => count + 1);
      setStatus('warning');
    }
  };

  return (
    <div className="grid gap-5">
      <CodeBlock code={exercise.code} language="css" label="CSS para observar" />
      <div className="grid gap-4 lg:grid-cols-3">
        {exercise.options.map((option) => (
          <button key={option.id} className="grid gap-3 rounded-[26px] bg-white p-4 text-left shadow-soft transition hover:-translate-y-1" onClick={() => handlePick(option.id)}>
            <strong className="text-lg font-black text-ink">{option.label}</strong>
            <HtmlPreview htmlContent={option.html} cssContent="" />
          </button>
        ))}
      </div>

      <ExerciseFeedback
        status={status}
        message={status === 'success' ? exercise.successMessage : 'Quase la! Compare o codigo com o que voce ve.'}
        showHint={attempts >= 2 && status === 'warning'}
        hint="Procure primeiro cor, tamanho e alinhamento. Esses sinais visuais aparecem rapido."
      />
    </div>
  );
}

PredictExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default PredictExercise;
