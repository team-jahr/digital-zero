import { setFormId, setShowInspectionForm } from '../store/slices/AppSlice.ts';
import toast from 'react-hot-toast';
import { Dispatch } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import {
  setAllAreas,
  setAllLocations,
  setDefaultLocation,
  setIsDraft,
  setListOfIssues,
  setOtherLocations,
} from '../store/slices/InspectionFormSlice.ts';
import { Area, Inputs, Location } from '../types/types.ts';

export const createNewInspectionForm = (dispatch: Dispatch<UnknownAction>) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/inspections/new-inspection`, {
    method: 'POST',
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status > 400) {
        return new Error('We have a problem');
      }
    })
    .then((res) => {
      dispatch(setFormId(res.id));
      dispatch(setDefaultLocation(res.location));
      toast.success('Successfully created new inspection!');
      dispatch(setShowInspectionForm(true));
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const fetchAllLocations = (
  dispatch: Dispatch<UnknownAction>,
  defaultLocation: Location,
) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(setAllLocations(res));
      return res;
    })
    .then((res) => {
      const otherLocations = res.filter(
        (el: Location) => el.name !== defaultLocation.name,
      );
      dispatch(setOtherLocations(otherLocations));
    })
    .catch((err) => console.log(err));
};
export const fetchAllAreas = (
  dispatch: Dispatch<UnknownAction>,
  location: number,
) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/areas?location=${location}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(setAllAreas(res));
    });
};

export const submitInspectionForm = (
  data: Inputs,
  locations: Location[],
  areas: Area[],
  formId: number,
  isDraft: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  const responseLocation = locations.filter(
    (el: Location) => el.id === +data.location,
  )[0];
  const responseArea = areas.filter((el: Area) => el.id == +data.area)[0];
  const responseEmail = data.email ? data.emails[0].value : null;
  const responseBody = {
    id: formId,
    isDraft: isDraft,
    date: new Date(data.date).toISOString(),
    location: responseLocation,
    area: responseArea,
    email: responseEmail,
    description: data.description,
  };
  console.log(JSON.stringify(responseBody));
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/inspections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseBody),
  })
    .then((res) => {
      console.log(res);
      dispatch(setIsDraft(false));
    })
    .catch((err) => console.log(err));
};

export const fetchAllIssues = (dispatch: Dispatch<UnknownAction>) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/issues`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(setListOfIssues(res.dtos));
    })
    .catch((err) => console.log(err));
};
