import { useState } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const addContact = (data) => {
    const addingUniqueName = contacts
      .map((contact) => contact.name.toLowerCase())
      .includes(data.name.toLowerCase());

    if (addingUniqueName) {
      alert(`${data.name} is already in your phone book`);
    } else {
      const contact = {
        id: nanoid(),
        name: data.name,
        number: data.number,
      };
      setContacts((prevState) => [contact, ...prevState]);
    }
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactID) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactID)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteBtn={deleteContact}
      ></ContactList>
    </>
  );
}
