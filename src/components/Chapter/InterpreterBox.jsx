import PropTypes from 'prop-types';

function InterpreterBox({ text }) {
  return (
    <section className="rounded-[26px] border-2 border-yellow-300 bg-yellow-100/90 p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-sm">👤</span>
        <div className="grid gap-2">
          <h3 className="text-lg font-black text-yellow-900">Para o interprete</h3>
          <p className="text-[15px] font-bold leading-7 text-yellow-900">{text}</p>
        </div>
      </div>
    </section>
  );
}

InterpreterBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InterpreterBox;
