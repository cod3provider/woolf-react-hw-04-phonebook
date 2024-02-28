import {useState} from 'react';

import s from './ContactForm.module.css';

const ContactForm = ({onSubmit}) => {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit({name, number});
		reset();
	};

	const reset = () => {
		setName('');
		setNumber('');
	}

	return (
		<div className={s.wrap}>
			<form onSubmit={handleSubmit} className={s.form}>
				<label htmlFor='contactName' className={s.label}>Name</label>
				<input
					className={s.input}
					onChange={e => setName(e.target.value)}
					id='contactName'
					type='text'
					name='name'
					value={name}
					pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
				/>

				<label htmlFor='contactNumber' className={s.label}>Number</label>
				<input
					className={s.input}
					onChange={e => setNumber(e.target.value)}
					id='contactNumber'
					type='tel'
					name='number'
					value={number}
					pattern='\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}'
					title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
					required
				/>

				<button className={s.button} type='submit'>Add contact</button>
			</form>
		</div>
	)
}

export default ContactForm;
