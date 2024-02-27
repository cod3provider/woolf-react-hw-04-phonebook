import s from './Filter.module.css';

const Filter = ({ value, handleChange }) => {
  return (
    <>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type='text'
          value={value}
          onChange={handleChange}
          placeholder='Search'
        />
      </label>
    </>
  );
};

export default Filter;
