import {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Container from './shared/Container/Container';

const App = () => {
	const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) || []);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
		setContacts(contacts);
	}, [contacts]);

	const createContact = ({name, number}) => {
		const newContact = {
			id: nanoid(),
			name,
			number,
		};

		setContacts(prevState => {
			const isExist = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
			if (isExist) {
				alert(`${name} is already in contacts.`);
				return false;
			}
			return [newContact, ...prevState];
		})
	};

	const handleFilterChange = e => {
		const {value} = e.target;
		setFilter(value);
	};

	const getFilteredContacts = () => {
		console.log(contacts)
		return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
	};

	const handleDelete = contactId => {
		setContacts(prevState => prevState.filter(({id}) => id !== contactId))
	};

	const filteredContacts = getFilteredContacts();

	return (
		<Container>
			<h1>Phonebook</h1>
			<ContactForm onSubmit={createContact}/>

			<h2>Contacts</h2>
			<Filter value={filter} handleChange={handleFilterChange}/>
			<ContactsList contacts={filteredContacts} onDelete={handleDelete}/>
		</Container>
	);
}

export default App;
