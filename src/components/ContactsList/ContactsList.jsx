import s from './ContactList.module.css';

import {ReactComponent as Icon} from '../../icons/trash.svg';

const ContactsList = ({ contacts, onDelete }) => {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) =>
        <li className={s.item} key={id}>
          {name}: {number}
          <button className={s.button} onClick={() => onDelete(id)}>
            <Icon className={s.icon} />
          </button>
        </li>,
      )}
    </ul>
  );
};

export default ContactsList;
