import PropTypes from 'prop-types';

function ColorPicker({ label, value, onChange }) {
  return (
    <label className="grid gap-2 rounded-2xl bg-white p-3 shadow-sm">
      <span className="text-sm font-extrabold text-slate-600">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-16 rounded-xl border-none bg-transparent"
        />
        <span className="font-code text-sm font-bold text-slate-600">{value}</span>
      </div>
    </label>
  );
}

ColorPicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
