import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export default function App() {
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm></ContactForm>
      <Filter></Filter>
      <ContactList></ContactList>
    </>
  );
}
