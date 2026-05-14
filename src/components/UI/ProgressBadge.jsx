import PropTypes from 'prop-types';

function ProgressBadge({ completed, total, percent, large = false }) {
  return (
    <div
      className={`grid gap-1 rounded-[24px] bg-gradient-to-br from-primary to-secondary text-white shadow-soft ${
        large ? 'min-w-[180px] p-5' : 'min-w-[150px] p-4'
      }`}
    >
      <strong className={large ? 'text-4xl font-black' : 'text-3xl font-black'}>{percent}%</strong>
      <span className="text-sm font-extrabold">
        {completed}/{total} capitulos
      </span>
    </div>
  );
}

ProgressBadge.propTypes = {
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  large: PropTypes.bool,
};

export default ProgressBadge;
