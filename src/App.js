import React, { useState } from "react";
import data from "./data/category-relation.json";
import DropdownCheckbox from "./components/DropdownCheckbox";
import "./App.css";

function App() {
  const [checkedItems, setCheckedItems] = useState({});
  const [text, setText] = useState("");
  const updateChildCheckboxes = (
    id,
    isChecked,
    data,
    updatedCheckedItems = {}
  ) => {
    if (data[id] && data[id]?.children) {
      Object.keys(data[id].children).forEach((childId) => {
        updatedCheckedItems[childId] = isChecked;

        updateChildCheckboxes(
          childId,
          isChecked,
          data[id].children,
          updatedCheckedItems
        );
      });
    }
  };

  const handleCheckboxChange = (e, categoryId, categoryValue, data) => {
    const isChecked = e.target.checked;
    const updatedCheckedItems = { ...checkedItems, [categoryId]: isChecked };
    if (data[categoryId]) {
      updateChildCheckboxes(categoryId, isChecked, data, updatedCheckedItems);
    }
    setCheckedItems(updatedCheckedItems);
    setText((prev) => {
      const items = prev ? prev.split(", ") : [];
      const updatedItems = new Set(items);
      if (isChecked) {
        updatedItems.add(categoryValue);
        if (data[categoryId] && data[categoryId].children) {
          Object.keys(data[categoryId].children).forEach((childcategoryId) => {
            updatedItems.add(
              data[categoryId].children[childcategoryId].categoryValue
            );
          });
        }
      } else {
        updatedItems.delete(categoryValue);
        if (data[categoryId] && data[categoryId].children) {
          Object.keys(data[categoryId].children).forEach((childcategoryId) => {
            updatedItems.delete(
              data[categoryId].children[childcategoryId].categoryValue
            );
          });
        }
      }
      return Array.from(updatedItems).join(", ");
    });
  };
  return (
    <div className="App">
      <DropdownCheckbox
        data={data.relationships}
        onChange={handleCheckboxChange}
        checkedItems={checkedItems}
        text={text}
      />
    </div>
  );
}

export default App;
