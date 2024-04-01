import { setFormId, setShowInspectionForm } from '../store/slices/AppSlice.ts';
import toast from 'react-hot-toast';
import { Dispatch } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import {
  setAllAreas,
  setAllLocations,
  setDefaultLocation,
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
  isSubmitted: boolean,
) => {
  const responseLocation = locations.filter(
    (el: Location) => el.id === +data.location,
  )[0];

  const responseArea = areas.filter((el: Area) => el.id == +data.area)[0];
  const createEmailString = () => {
    let emailList = '';
    for (let i = 0; i < data.emails.length; i++) {
      emailList += `${data.emails[i].value},`;
    }
    return emailList.substring(0, emailList.length - 1);
  };
  const responseEmail = data.email ? createEmailString() : null;

  const responseBody = {
    id: formId,
    isSubmitted: isSubmitted,
    date: new Date(data.date).toISOString(),
    location: responseLocation,
    area: responseArea,
    email: responseEmail,
    description: data.description,
  };
  //TODO to remove console.log
  console.log(JSON.stringify(responseBody));
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/inspections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseBody),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const fetchAllIssues = (
  dispatch: Dispatch<UnknownAction>,
  id: number,
) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/inspections/${id}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(setListOfIssues(res.issues));
    })
    .catch((err) => console.log(err));
};

export const formatImages = (imgData: string): string => {
  return imgData.split(',')[1];
};

export const deleteIssueFromApi = (id: number) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/issues/${id}`, {
    method: 'DELETE',
  })
    .then((res) => console.log(res.status))
    .catch(() => console.log('Error when deleting'));
};
