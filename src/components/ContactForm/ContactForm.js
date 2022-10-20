import PropTypes from "prop-types";
import css from "./ContactForm.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useLocalStorage("name", "");
  const [number, setNumber] = useLocalStorage("number", "");

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
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <form className={css.Contact_form} onSubmit={onSubmitForm}>
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
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
