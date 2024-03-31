const NameInput = () => {
  return (
    <div className='form-field-container'>
      <label className='form-label name-label' htmlFor='name'>
        Name
      </label>
      <input
        type='text'
        id='name'
        defaultValue='John Doe'
        readOnly
        className='form-input'
      />
    </div>
  );
};

export default NameInput;
