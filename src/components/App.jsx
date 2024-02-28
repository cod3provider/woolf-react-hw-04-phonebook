import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Container from './shared/Container/Container';

const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (isExist) {
      toast.warn(`${name} is already in contacts.`);
      return false;
    }

    setContacts(prevState => {
      return [newContact, ...prevState];
    });
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const handleDelete = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={createContact} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />

      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <ContactsList contacts={filteredContacts} onDelete={handleDelete} />
    </Container>
  );
};

export default App;
