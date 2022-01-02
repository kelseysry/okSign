const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input className="radio" type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default RadioButton
