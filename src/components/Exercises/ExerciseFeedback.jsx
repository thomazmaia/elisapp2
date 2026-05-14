import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

function ExerciseFeedback({ status, message, showHint, hint }) {
  return (
    <div className="grid gap-3">
      <AnimatePresence mode="wait">
        {status ? (
          <motion.div
            key={status + message}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-3 rounded-[22px] px-4 py-4 font-extrabold ${
              status === 'success' ? 'bg-success/15 text-green-700' : 'bg-warning/15 text-warning'
            }`}
          >
            <span className="text-3xl">{status === 'success' ? '🎉' : '💪'}</span>
            <span>{message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showHint && hint ? (
        <div className="rounded-[22px] border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-bold text-primary">
          Dica visual: {hint}
        </div>
      ) : null}
    </div>
  );
}

ExerciseFeedback.propTypes = {
  status: PropTypes.oneOf([null, 'success', 'warning']),
  message: PropTypes.string,
  showHint: PropTypes.bool,
  hint: PropTypes.string,
};

export default ExerciseFeedback;
