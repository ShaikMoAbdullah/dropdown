import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../../images/Dropdown";
import Tick from "../../images/Tick";

function DropdownCheckbox({ data, onChange, text, checkedItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const renderCheckboxes = (data) => {
    return Object.keys(data).map((key) => {
      const { categoryId, children, categoryValue } = data[key] || {};
      const isChecked = checkedItems[categoryId];
      const isPartiallyChecked = Object.keys(children || {}).some(
        (childKey) => checkedItems[childKey]
      );

      return (
        !categoryValue.includes("_diffnode") && (
          <div key={categoryId} className="pl-6">
            <label className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
              <input
                type="checkbox"
                name={categoryValue}
                checked={isChecked}
                onChange={(e) => onChange(e, categoryId, categoryValue, data)}
                className="hidden"
              />
              <span
                className={`h-4 w-4 border border-black flex items-center justify-center rounded ${
                  isChecked
                    ? "bg-black text-white"
                    : isPartiallyChecked
                    ? "bg-gray-300 text-gray-800"
                    : "bg-transparent text-transparent"
                }`}
              >
                {(isChecked || isPartiallyChecked) && <Tick />}
              </span>
              {categoryValue}
            </label>
            {children && <div>{renderCheckboxes(children)}</div>}
          </div>
        )
      );
    });
  };

  return (
    <div className="dropdown flex flex-col justify-start items-center relative border h-screen gap-1 p-4 text-sm">
      <div
        className="dropdown-button border w-60 px-4 py-2 rounded-md flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-ellipsis overflow-hidden whitespace-nowrap w-full text-left font-semibold">
          {text || "Select Category"}
        </span>
        <Dropdown />
      </div>
      {isOpen && (
        <div
          className="dropdown-content border w-80 rounded-md h-1/2 overflow-scroll"
          ref={dropdownRef}
        >
          {renderCheckboxes(data)}
        </div>
      )}
    </div>
  );
}

export default DropdownCheckbox;
