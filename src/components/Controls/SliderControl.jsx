import PropTypes from 'prop-types';

function SliderControl({ label, value, min, max, step, unit = '', onChange }) {
  return (
    <label className="grid gap-2 rounded-2xl bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-extrabold text-slate-600">{label}</span>
        <span className="font-code text-sm font-bold text-primary">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-primary"
      />
    </label>
  );
}

SliderControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  unit: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SliderControl;
