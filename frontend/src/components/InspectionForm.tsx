import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";
import {location, user} from "../data/data.ts";
import './InspectionFormStyles.css'
import {Area, Inputs} from "../types.ts";

const InspectionForm = () => {

  const [currentLocation, setCurrentLocation] = useState(user.location);
  const [otherLocations] = useState(location.filter(el => el.name !== currentLocation.name))
  const {
    register,
    handleSubmit,
    resetField,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
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


      {/* below place add issue button*/}


      {/* below place send email checkbox*/}


      {/* below place enter email/emails input/inputs*/}


      {/* below place buttons save draft and submit*/}


      <input type="submit"/>
    </form>
  );
};

export default InspectionForm;