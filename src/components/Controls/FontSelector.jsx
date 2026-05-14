import PropTypes from 'prop-types';

function FontSelector({ label, value, options, onChange }) {
  return (
    <div className="grid gap-2 rounded-2xl bg-white p-3 shadow-sm">
      <span className="text-sm font-extrabold text-slate-600">{label}</span>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-2xl border px-3 py-3 text-left text-base font-bold transition ${
              value === option ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
            style={{ fontFamily: option }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

FontSelector.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FontSelector;
