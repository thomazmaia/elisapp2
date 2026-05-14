import PropTypes from 'prop-types';

function SelectControl({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2 rounded-2xl bg-white p-3 shadow-sm">
      <span className="text-sm font-extrabold text-slate-600">{label}</span>
      <select
        className="min-h-[44px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-bold text-slate-700"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

SelectControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectControl;
