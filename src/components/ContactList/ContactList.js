import React from "react";
import PropTypes from "prop-types";
import css from "./ContactsList.module.css";

const ContactList = ({ contacts, onDeleteBtn }) => {
  return (
    <div>
      <ul className={css.Contact_list}>
        {contacts.map((contact) => (
          <li key={contact.id} className={css.Contact_list__item}>
            {contact.name} : {contact.number}
            {
              <button
                className={css.DeleteBtn}
                type="button"
                name="delete"
                onClick={() => onDeleteBtn(contact.id)}
              >
                Delete contact
              </button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  onDeleteBtn: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
