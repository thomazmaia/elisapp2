import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import CodeBlock from '../Chapter/CodeBlock';
import LivePanel from '../LiveEditor/LivePanel';
import ExerciseFeedback from './ExerciseFeedback';

const normalizeValue = (value) => {
  if (typeof value === 'number') {
    return Number(value.toFixed(2));
  }

  return String(value).replace(/\s+/g, ' ').trim().toLowerCase();
};

function MatchPreviewExercise({ exercise, solved, onSolved }) {
  const [currentValues, setCurrentValues] = useState({});
  const [status, setStatus] = useState(solved ? 'success' : null);

  const similarity = useMemo(() => {
    const entries = Object.entries(exercise.expectedValues);
    const matches = entries.filter(([key, value]) => normalizeValue(currentValues[key]) === normalizeValue(value)).length;
    return Math.round((matches / entries.length) * 100);
  }, [currentValues, exercise.expectedValues]);

  const handleValuesChange = (values) => {
    setCurrentValues(values);
    const correct = Object.entries(exercise.expectedValues).every(
      ([key, value]) => normalizeValue(values[key]) === normalizeValue(value),
    );

    if (correct) {
      setStatus('success');
      onSolved();
    } else {
      setStatus(null);
    }
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="grid gap-4">
          <CodeBlock code={exercise.targetCss} language="css" label="Preview alvo" />
          <div className="rounded-[24px] bg-primary/5 p-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">Similaridade</p>
            <div className="mt-3 h-4 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${similarity}%` }} />
            </div>
            <p className="mt-2 text-sm font-bold text-slate-600">{similarity}% parecida com o alvo</p>
          </div>
        </div>

        <LivePanel panel={exercise.livePanel} mode="exercise" onValuesChange={handleValuesChange} />
      </div>

      <ExerciseFeedback
        status={status}
        message={status === 'success' ? exercise.successMessage : ''}
        showHint={similarity >= 50 && similarity < 100}
        hint="Voce esta perto. Compare cor, tamanho ou posicao com o alvo."
      />
    </div>
  );
}

MatchPreviewExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default MatchPreviewExercise;
