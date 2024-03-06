import { ErrorMessage, Field } from "formik";
import { useState } from "react";

const AutoComplete = ({ field, choosen, fieldValue, setFieldValue }) => {
  const [inputValue, setInputValue] = useState(fieldValue);
  const [filteredChoosen, setFilteredChoosen] = useState(choosen);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Determine if inputValue contains a number
    const containsNumber = /\d/.test(value);

    // Update filtering logic based on containsNumber
    const filtered = choosen.filter((item) =>
      containsNumber
        ? item?.phoneNumber.includes(value)
        : item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredChoosen(filtered);
  };

  const renderOptions = () => {
    return filteredChoosen.map((item) => (
      <li
        className="choosen-item"
        key={item.id}
        onClick={() => {
          console.log(field.fieldName, item.name);
          setFieldValue(field.fieldName, item.name);
          setFieldValue(field.fieldName.replace("Name", "Id"), item.id);
          setInputValue(item.name);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {item.name}
      </li>
    ));
  };
  const validationFunction = (value) => {
    return value
      ? undefined
      : `Trường ${field.fieldDisplay.toLowerCase()} là bắt buộc`;
  };
  return (
    <div className="modal-data modal-modify-choosen">
      <label className="modal-label" htmlFor={field.fieldName}>
        {field.fieldDisplay}
      </label>
      <Field
        type="text"
        name={field.fieldName}
        className="modal-input"
        onChange={handleChange}
        value={inputValue}
        validate={validationFunction}
      />
      <ErrorMessage
        name={field.fieldName}
        component="div"
        className="error-message"
      />
      <div className="choosen-container">
        <ul className="choosen">{renderOptions()}</ul>
      </div>
    </div>
  );
};

export default AutoComplete;
