import {useForm, SubmitHandler, useFieldArray} from "react-hook-form";
import {useState} from "react";
import {location, user} from "../data/data.ts";
import './InspectionFormStyles.css'
import AddIssueButton from './AddIssueButton';
import {Area, Inputs} from "../types/types.ts";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const InspectionForm = () => {
  const handleAddIssue = () => {
    // Logic to handle adding an issue goes here
  };
  const [currentLocation, setCurrentLocation] = useState(user.location);
  const [sendEmail, setSendEmail] = useState(false);
  const [otherLocations] = useState(location.filter(el => el.name !== currentLocation.name))
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: {errors}
  } = useForm<Inputs>({
    defaultValues: {
      emails: [{value: ""}]
    }
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const {fields, append, remove} = useFieldArray({
    name: "emails",
    control
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label className="name-label" htmlFor="name">Name</label>
      <input type="text" id="name" defaultValue={user.name} readOnly className="input"/>
      <label className="date-label" htmlFor="date">Date</label>
      <input type="date" id="date" className="input"
             {...register("date", {valueAsDate: true})}
             defaultValue={new Date().toISOString().substring(0, 10)}/>
      <label className="location-label" htmlFor="location">Location</label>
      <select id="location" {...register("location", {
        onChange: e => {
          const selectedLocation = location.filter(element => element.name === e.target.value)
          resetField("area")
          setCurrentLocation(selectedLocation[0]);
        }
      })} className="select">
        <option value={user.location.name}>{user.location.name}</option>
        {otherLocations.map(element => {
          const {name, id} = element;
          return (
            <option value={name} key={id}>{name}</option>
          )
        })}
      </select>
      <label className="area-label" htmlFor="area">Area</label>
      <select id="area" {...register("area")} className="select">
        <option value="">Select area</option>
        {currentLocation.area.map((element: Area) => {
          const {name, id} = element;
          return (
            <option value={name} key={id}>{name}</option>
          )
        })}
      </select>

      {/* below place import for list component*/}

      <AddIssueButton onAddIssue={handleAddIssue}/>
      <label className="label email-label">
        <input type="checkbox" placeholder="email" {...register("email", {
          onChange: () => {
            resetField("emails")
            setSendEmail(!sendEmail)
          }
        })} />
        Send email
      </label>
      {sendEmail &&
          <div className="form-email-field-wrapper">
              <label className="emails-label">Enter email(s):</label>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="form-email-field">
                  <input
                    {...register(`emails.${index}.value` as const, {
                      required: true,
                      pattern: /^\S+@\S+$/i
                    })}
                    className={errors?.emails?.[index]?.value ? "input email-input error" : "input email-input"}
                  />
                  {fields.length > 1 &&
                      <Button
                          type='default'
                          className="email"
                          shape="circle"
                          icon={<DeleteOutlined/>}
                          onClick={() =>
                            remove(index)}
                      />
                  }
                </div>
              )
            })}
              <Button
                  type='primary'
                  className="primary-button"
                  onClick={() =>
                    append({
                      value: "",
                    })}
              >
                  Add another email
              </Button>
          </div>
      }
      <div className="form-description-field">
        <label className="description-label">Additional notes</label>
        <textarea {...register("description")} className="textarea"/>
      </div>
      {/* below place buttons save draft and submit*/}


      <input type="submit"/>
    </form>
  );
};

export default InspectionForm;