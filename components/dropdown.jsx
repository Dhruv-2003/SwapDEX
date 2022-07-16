import React from "react";
import styles from "../styles/Home.module.css";
import DropdownContent from "./dropdownContent";

const Dropdown = ({ tokens }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdowbtn}>Select a Token</div>
      <div className={styles.dropdownContent}>
        <div className={styles.dropdownitem}></div>
      </div>
    </div>
  );
};

export default Dropdown;
