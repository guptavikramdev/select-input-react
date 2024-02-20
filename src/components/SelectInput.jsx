/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import SearchIcon from "./icons/SearchIcon";
import useOutsideClick from "../utils/useOutsideClick";
const SelectInput = ({
  option,
  placeholder = "",
  selectedItem = "",
  onChange,
}) => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDropDownOpen, setIsisDropDownOpen] = useState("");
  const objeref = useRef(null);
  const divRef = useRef(null);
  const iconRef = useRef(null);
  const ref = useOutsideClick(() => {
    divRef.current.classList.remove("active");
    iconRef.current.classList.remove("active");
    setSearchText("");
    setIsisDropDownOpen(!isDropDownOpen);
  });
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const searchResult = option.filter((item) =>
      item[objeref.current[1]]
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilterOptions(searchResult);
  };
  const handleClick = () => {
    divRef.current.classList.toggle("active");
    iconRef.current.classList.toggle("active");
    setIsisDropDownOpen(!isDropDownOpen);
  };
  const handleSelect = (item) => {
    onChange(item);
    divRef.current.classList.remove("active");
    iconRef.current.classList.remove("active");
    setIsisDropDownOpen(!isDropDownOpen);
    setSearchText("");
  };
  useEffect(() => {
    setFilterOptions(option);
    objeref.current = option.length > 0 ? Object.keys(option[0]) : null;
  }, [option, isDropDownOpen]);
  return (
    <div className="select_box" ref={ref}>
      <div className="select_box_input" onClick={handleClick}>
        <div className="selected_item">
          {(selectedItem === null || selectedItem === "") && (
            <span className="placeholder">{placeholder || "Select..."}</span>
          )}
          {typeof selectedItem == "object" &&
            Object.keys(selectedItem).length == 0 && (
              <span className="placeholder">{placeholder || "Select..."}</span>
            )}
          {typeof selectedItem == "object" &&
            Object.keys(selectedItem).length > 0 && (
              <span>{selectedItem[Object.keys(selectedItem)[1]]}</span>
            )}
          {(typeof selectedItem == "number" ||
            typeof selectedItem == "string") && <span>{selectedItem}</span>}
        </div>
        <div className="icon" ref={iconRef}>
          <ArrowIcon />
        </div>
      </div>
      <div className={`select_box_list `} ref={divRef}>
        <div className="search_box_container">
          <div className="search_box">
            <input
              type="text"
              className="search_input"
              placeholder="Search...."
              onChange={handleSearch}
              value={searchText}
            />
            <SearchIcon />
          </div>
        </div>

        <div className="list_items">
          <ul>
            {!!filterOptions.length &&
              filterOptions.map((item, index) => {
                if (typeof item === "object" && item !== null) {
                  const objKey = objeref.current;
                  return (
                    objKey.length && (
                      <li
                        key={index}
                        className={`${
                          item[objKey[0]] == selectedItem[objKey[0]]
                            ? "active"
                            : ""
                        }`}
                        value={item[objKey[0]]}
                        onClick={() => handleSelect(item)}
                      >
                        {item[objKey[1]]}
                      </li>
                    )
                  );
                } else {
                  return (
                    <li
                      key={index}
                      className={`${item == selectedItem ? "active" : ""}`}
                      onClick={() => handleSelect(item)}
                      value={item}
                    >
                      {item}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
