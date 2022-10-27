import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, getFilter } from "../../redux/selectors";
import { removeContacts } from "../../redux/contacts/contacts-slice";
import css from "./ContactsList.module.css";

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactID) => {
    const action = removeContacts(contactID);
    dispatch(action);
  };
  return (
    <div>
      {contacts && (
        <ul className={css.Contact_list}>
          {getFilteredContacts().map((contact) => (
            <li key={contact.id} className={css.Contact_list__item}>
              {contact.name} : {contact.number}
              {
                <button
                  className={css.DeleteBtn}
                  type="button"
                  name="delete"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete contact
                </button>
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
