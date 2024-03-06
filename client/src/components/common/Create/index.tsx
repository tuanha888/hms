import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { Field, InitField } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field as FieldForm, Form, Formik } from "formik";
import { FaImages, FaTimes } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Modify/Modify.scss";
import AutoComplete from "../AutoComplete";
import { parseISO } from "date-fns";
import { setLoading } from "../../../redux/features/loadingSlice";
import { setNotification } from "../../../redux/features/notificationSlice";
interface CreateProps {
  fields: Field[];
  handleSubmit: Function;
  closeCreateModal: Function;
  initFields: InitField[];
}
const DateTimeInput = ({ field, form, ...props }) => {
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={(val) => form.setFieldValue(field.name, val)}
        showTimeSelect
        timeIntervals={15} // Adjust as needed
        dateFormat="dd/MM/yyyy HH:mm"
      />
    </div>
  );
};
const DateDayInput = ({ field, form, ...props }) => {
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={(val) => form.setFieldValue(field.name, val)}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};
const Create: React.FC<CreateProps> = ({
  fields,
  handleSubmit,
  closeCreateModal,
  initFields,
}) => {
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const handleCloseModify = () => {
    openConfirmModal();
  };
  const dateValidation = (value) => {
    const fieldValue = new Date(value);
    const now = new Date();
    return fieldValue < now
      ? "Thời gian phải lớn hơn thời gian hiện tại"
      : undefined;
  };
  const textValidation = (field) => {
    return (value) => {
      return value
        ? undefined
        : `Trường ${field.fieldDisplay.toLowerCase()} là bắt buộc`;
    };
  };
  let initialValues: any = {};

  fields.forEach((field) => {
    // Initialize based on existing values for update operation
    switch (field.type) {
      case "text":
      case "textarea":
        initialValues[field.fieldName] = ""; // You can set the default value for text and textarea
        break;
      case "image":
        initialValues[field.fieldName] = null; // You can set the default value for image
        break;
      case "datetime":
      case "dateday":
        initialValues[field.fieldName] = "";
        //  parseISO(new Date().toISOString()); // You can set the default value for date
        break;
      case "boolean":
        initialValues[field.fieldName] = true;
      default:
        initialValues[field.fieldName] = "";
    }
  });
  initFields.forEach((field) => {
    initialValues[field.fieldName] = field.fieldValue;
  });
  const handleScale = useCallback((textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, []);
  const handleEnter = () => {
    document.querySelectorAll(".autoScaleTextarea").forEach((textarea) => {
      handleScale(textarea);
    });
  };
  const handleSubmitClick = async (values) => {
    if (fields.some((field) => field.type === "image")) {
      const formData = new FormData();
      fields.forEach((field) => {
        if (field.type !== "image")
          formData.append(field.fieldName, values[field.fieldName]);
        else if (values[field.fieldName])
          formData.append(field.fieldName, values[field.fieldName]);
      });

      try {
        console.log(formData);
        dispatch(setLoading(true));
        await handleSubmit(formData);
        dispatch(setLoading(false));
        dispatch(setNotification("success"));
        closeCreateModal();
      } catch (error) {
        dispatch(setNotification("error"));
        closeCreateModal();
      }
    } else {
      try {
        console.log(values);
        dispatch(setLoading(true));
        await handleSubmit(values);
        dispatch(setLoading(false));
        dispatch(setNotification("success"));
        closeCreateModal();
      } catch (error) {
        dispatch(setNotification("error"));
        closeCreateModal();
      }
    }
  };
  const imagePicker = useRef(null);
  const dispatch: AppDispatch = useDispatch();
  const renderField = (setFieldValue) => {
    const renderFields: ReactNode[] = [];
    fields.forEach((field) => {
      if (field.modifyDisplay) {
        let validationFunction;
        if (field.needValidated) {
          validationFunction = (value) => {
            if (field.type === "datetime" || field.type === "dateday") {
              const now = new Date();
              const fieldValue = new Date(value);

              return fieldValue < now
                ? "Thời gian phải lớn hơn thời gian hiện tại"
                : undefined;
            } else if (field.type === "text" || field.type === "textarea") {
              return value
                ? undefined
                : `Trường ${field.fieldDisplay.toLowerCase()} là bắt buộc`;
            }

            return undefined;
          };
          if (field.fieldName === "birthday")
            validationFunction = (value) => {
              const fieldValue = new Date(value);
              const now = new Date();
              return fieldValue > now
                ? "Ngày sinh phải bé hơn hiện tại"
                : undefined;
            };
          if (field.fieldName === "phoneNumber") {
            validationFunction = (value) => {
              return value.trim().length !== 10
                ? "Số điện thoại phải có 10 chữ số"
                : undefined;
            };
          }
        }
        if (field.type === "text") {
          if (field.choosen !== null) {
            // const renderChoosen = () => {
            //   return field.choosen.map((item: any) => {
            //     return (
            //       <li
            //         className="choosen-item"
            //         key={item.id}
            //         onClick={() => {
            //           console.log(field.fieldName, item.name);
            //           setFieldValue(field.fieldName, item.name);
            //           setFieldValue(
            //             field.fieldName.replace("Name", "Id"),
            //             item.id
            //           );
            //         }}
            //         onMouseDown={(e) => {
            //           // Prevent the input from losing focus
            //           e.preventDefault();
            //         }}
            //       >
            //         {item.name}
            //       </li>
            //     );
            //   });
            // };
            // renderFields.push(
            //   <div className="modal-data modal-modify-choosen">
            //     <label className="modal-label" htmlFor={field.fieldName}>
            //       {field.fieldDisplay}
            //     </label>
            //     <FieldForm
            //       type="text"
            //       name={field.fieldName}
            //       className="modal-input"
            //     />
            //     <div className="choosen-container">
            //       <ul className="choosen">{renderChoosen()}</ul>
            //     </div>
            //   </div>
            // );
            renderFields.push(
              <AutoComplete
                field={field}
                choosen={field.choosen}
                setFieldValue={setFieldValue}
                fieldValue={""}
              />
            );
          } else
            renderFields.push(
              <div className="modal-data">
                <label className="modal-label" htmlFor={field.fieldName}>
                  {field.fieldDisplay}
                </label>
                <FieldForm
                  type="text"
                  name={field.fieldName}
                  className="modal-input"
                  validate={validationFunction}
                />
                <ErrorMessage
                  name={field.fieldName}
                  component="div"
                  className="error-message"
                />
              </div>
            );
        } else if (field.type === "datetime") {
          renderFields.push(
            <div className="modal-data">
              <label htmlFor={field.fieldName} className="modal-label">
                {field.fieldDisplay}
              </label>
              <FieldForm
                name={field.fieldName}
                className="modal-input"
                component={DateTimeInput}
                validate={validationFunction}
              />
              <ErrorMessage
                name={field.fieldName}
                component="div"
                className="error-message"
              />
            </div>
          );
        } else if (field.type === "dateday") {
          renderFields.push(
            <div className="modal-data">
              <label htmlFor={field.fieldName} className="modal-label">
                {field.fieldDisplay}
              </label>
              <FieldForm
                name={field.fieldName}
                className="modal-input"
                component={DateDayInput}
                validate={validationFunction}
              />
              <ErrorMessage
                name={field.fieldName}
                component="div"
                className="error-message"
              />
            </div>
          );
        } else if (field.type === "image") {
          renderFields.unshift(
            <div className="modal-data">
              <div className="overview-img-container modify-image-container">
                <label
                  htmlFor="get-image"
                  className="modal-label image-picker"
                  ref={imagePicker}
                >
                  <FaImages />
                </label>
                <div className="overview-img ">
                  <img
                    src={
                      "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>

              <input
                type="file"
                name="get-image"
                id="get-image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files && event.target.files[0]) {
                    setFieldValue(field.fieldName, event.target.files[0]);
                    (imagePicker.current! as any).classList.add("is-actived");
                  }
                }}
                style={{ display: "none" }}
              ></input>
            </div>
          );
        } else if (field.type === "textarea") {
          renderFields.push(
            <div className="modal-data" key={field.fieldName}>
              <label htmlFor={field.fieldName} className="modal-label">
                {field.fieldDisplay}
              </label>
              <FieldForm
                as="textarea"
                name={field.fieldName}
                className="modal-input autoScaleTextarea"
                onInput={() =>
                  handleScale(document.querySelector(".autoScaleTextarea"))
                }
                onKeyDown={handleEnter}
                validate={validationFunction}
              />
              <ErrorMessage
                name={field.fieldName}
                component="div"
                className="error-message"
              />
            </div>
          );
        } else if (field.type === "boolean") {
          renderFields.push(
            <div className="modal-data">
              <label className="modal-label" htmlFor={field.fieldName}>
                {field.fieldDisplay}
              </label>
              <FieldForm
                type="checkbox"
                name={field.fieldName}
                component="input" // Specify the component as "input" for checkbox
              />
            </div>
          );
        } else if (field.type.startsWith("select")) {
          renderFields.push(
            <div className="modal-data">
              <label className="modal-label" htmlFor={field.fieldName}>
                {field.fieldDisplay}
              </label>
              <FieldForm
                as="select" // Use "as" prop to specify the HTML element
                name={field.fieldName}
                className="modal-input"
                onChange={(e) => setFieldValue(field.fieldName, e.target.value)}
                defaultValue="MALE"
              >
                {field.fieldName === "gender" && (
                  <>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </>
                )}
                {field.fieldName === "stayType" && (
                  <>
                    <option value="STAY">Nội trú</option>
                    <option value="NOT_STAY">Ngoại trú</option>
                    <option value="DAYTIME_STAY">Ở ban ngày</option>
                  </>
                )}
                {field.fieldName === "rating" && (
                  <>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </>
                )}
              </FieldForm>
            </div>
          );
        }
      }
    });
    return renderFields;
  };
  //   const handleSubmit = (values) => {
  //     // if (fields.some((field) => field.type === "image")) {
  //     //   const formData = new FormData();
  //     //   fields.forEach((field) => {
  //     //     if (field.type !== "image")
  //     //       formData.append(field.fieldName, values[field.fieldName]);
  //     //     else if (values[field.fieldName])
  //     //       formData.append(field.fieldName, values[field.fieldName]);
  //     //   });
  //     //   handleSubmit(formData);
  //     // } else handleSubmit(values);
  //     console.log(values);
  //   };
  useEffect(() => {
    const textarea = document.querySelector(".autoScaleTextarea");
    handleScale(textarea);
  }, []);
  return (
    <div className="modify modal-container" style={{ zIndex: 99999 }}>
      <div className="modal-wrapper">
        <div className="modal modify-modal">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmitClick(values)}
          >
            {({ setFieldValue }) => (
              <Form>
                {renderField(setFieldValue)}
                <button type="submit" className="modal-button">
                  Tạo
                </button>
                <button
                  type="button"
                  className="modal-button"
                  onClick={() => handleCloseModify()}
                >
                  Hủy
                </button>
              </Form>
            )}
          </Formik>
          <FaTimes
            className="modal-close"
            onClick={() => handleCloseModify()}
          />
        </div>
        {isConfirmModal && (
          <ConfirmModal
            type="MODIFY"
            closeConfirmModal={closeConfirmModal}
            closeModifyModal={closeCreateModal}
            deleteFunction={null}
          />
        )}
      </div>
    </div>
  );
};
export default Create;
