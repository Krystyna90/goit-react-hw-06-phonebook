import React from "react";
import PropTypes from "prop-types";
import css from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <label className={css.Filter_label}>
    Find contact by name
    <input
      className={css.Filter_input}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
