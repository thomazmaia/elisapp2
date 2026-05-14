import PropTypes from 'prop-types';
import { useState } from 'react';
import ExerciseFeedback from './ExerciseFeedback';
import styles from './Exercises.module.css';

function VisualIdentifyExercise({ exercise, solved, onSolved }) {
  const [selectedArea, setSelectedArea] = useState(null);
  const [feedback, setFeedback] = useState(solved ? { status: 'success', message: exercise.successMessage } : null);

  const handlePick = (area) => {
    setSelectedArea(area.id);
    if (area.isCorrect) {
      setFeedback({ status: 'success', message: exercise.successMessage });
      onSolved();
    } else {
      setFeedback({ status: 'warning', message: 'Quase! Tente tocar em outra parte da cena.' });
    }
  };

  return (
    <div className={styles.exerciseBody}>
      <div className={styles.sceneHeader}>
        <strong>{exercise.scene.title}</strong>
        <span>{exercise.scene.subtitle}</span>
      </div>
      <div className={styles.scene}>
        {exercise.areas.map((area) => (
          <button
            key={area.id}
            className={`${styles.sceneArea} ${selectedArea === area.id ? styles.slotActive : ''} ${
              feedback?.status === 'success' && area.isCorrect ? styles.correctArea : ''
            }`}
            style={{
              left: `${area.x}%`,
              top: `${area.y}%`,
              width: `${area.w}%`,
              height: `${area.h}%`,
            }}
            onClick={() => handlePick(area)}
          >
            <span>{area.emoji}</span>
            <small>{area.label}</small>
          </button>
        ))}
      </div>
      <ExerciseFeedback status={feedback?.status || null} message={feedback?.message} />
    </div>
  );
}

VisualIdentifyExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default VisualIdentifyExercise;
