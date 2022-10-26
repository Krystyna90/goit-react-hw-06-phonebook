import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "./ContactForm.module.css";
import { getContacts, getFilter } from "../../redux/selectors";
import {
  addContacts,
  removeContacts,
} from "../../redux/contacts/contacts-slice";
import { setFilter } from "../../redux/filter/filter-slice";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [number, setNumber] = useState("");

  const changeFilter = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const deleteContact = (contactID) => {
    const action = removeContacts(contactID);
    dispatch(action);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;

      case "number":
        setNumber(event.target.value);
        break;

      default:
        return;
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const addingUniqueName = contacts
      .map((contact) => contact.name.toLowerCase())
      .includes(name.toLowerCase());

    if (addingUniqueName) {
      alert(`${name} is already in your phone book`);
    } else {
      const action = addContacts({ name, number });
      dispatch(action);
    }

    setName("");
    setNumber("");
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <form className={css.Contact_form} onSubmit={(e) => onSubmitForm(e)}>
        <label className={css.Contact_label}>
          Name
          <input
            className={css.Contact_input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.Contact_label}>
          Number
          <input
            className={css.Contact_input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.Contact_btn} type="submit">
          Add to contact
        </button>
      </form>

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteBtn={deleteContact}
      ></ContactList>
    </>
  );
}
