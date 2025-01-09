const FormInput = ({ label, name, type, placeholder, defaultValue }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        className="input input-bordered w-full max-w-xs"
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default FormInput;
