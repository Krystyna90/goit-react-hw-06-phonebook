import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/filter/filter-slice";
import css from "./Filter.module.css";

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <label className={css.Filter_label}>
      Find contact by name
      <input
        className={css.Filter_input}
        type="text"
        value={filter}
        onChange={changeFilter}
      />
    </label>
  );
};

export default Filter;
