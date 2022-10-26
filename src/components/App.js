import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, getFilter } from "../redux/selectors";
import { addContacts, removeContacts } from "../redux/contacts/contacts-slice";
import { setFilter } from "../redux/filter/filter-slice";

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const addContactInfo = (data) => {
    const addingUniqueName = contacts
      .map((contact) => contact.name.toLowerCase())
      .includes(data.name.toLowerCase());

    if (addingUniqueName) {
      alert(`${data.name} is already in your phone book`);
    } else {
      const action = addContacts(data);
      dispatch(action);
    }
  };

  const changeFilter = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

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
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactInfo}></ContactForm>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteBtn={deleteContact}
      ></ContactList>
    </>
  );
}
