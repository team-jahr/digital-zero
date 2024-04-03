import { setFormId, setShowInspectionForm } from '../store/slices/AppSlice.ts';
import toast from 'react-hot-toast';
import { Dispatch } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import {
  setAllAreas,
  setAllLocations,
  setDefaultLocation,
  setOtherLocations,
} from '../store/slices/InspectionFormSlice.ts';
import {
  Area,
  InspectionFormInputs,
  Issue,
  IssueDTO,
  Location,
  Inspection,
  InspectionDTO,
  InspectionDisplay,
} from '../types/types.ts';
import { NavigateFunction } from 'react-router-dom';

export const createNewInspectionForm = (
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction,
) => {
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
      dispatch(setShowInspectionForm(true));
      navigate(`/new-inspection/${res.id}`);
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
  data: InspectionFormInputs,
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
  const responseEmail = createEmailString();
  const responseBody = {
    id: formId,
    isSubmitted: isSubmitted,
    date: new Date(data.date).toISOString(),
    location: responseLocation,
    area: responseArea,
    email: responseEmail,
    description: data.description,
  };

  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/inspections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseBody),
  }).catch((err) => console.log(err));
};

export const formatImages = (imgData: string): string => {
  return imgData.split(',')[1];
};

export const deleteIssueFromApi = (id: number) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/issues/${id}`, {
    method: 'DELETE',
  }).catch(() => console.log('Error when deleting'));
};

export const fetchInspectionIssues = async (id: number): Promise<Issue[]> => {
  try {
    const inspectionIssuesResponse: Response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/inspections/${id}/issues`,
    );
    const inspectionIssuesData: IssueDTO =
      await inspectionIssuesResponse.json();
    const inspectionIssues: Issue[] = inspectionIssuesData.issues;
    const inspectionIssuesIds: number[] = inspectionIssues.map((el) => el.id);

    const issuesResponse: Response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/issues`,
    );
    const issuesData: IssueDTO = await issuesResponse.json();
    const issues: Issue[] = issuesData.issues;

    const relevantIssues: Issue[] = issues.filter((issue) =>
      inspectionIssuesIds.includes(issue.id),
    );

    relevantIssues.map((el) => {
      if (el.images.length === 1 && el.images[0] === '') {
        el.images = [];
      }
    });

    return new Promise<Issue[]>((resolve) => resolve(relevantIssues));
  } catch (err) {
    return new Promise<Issue[]>((_resolve, reject) =>
      reject(Error('Error while fetching inspection')),
    );
  }
};

export const fetchInspections = async (): Promise<Inspection[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/inspections`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch inspections');
    }
    const data: InspectionDTO = await response.json();
    return new Promise<Inspection[]>((resolve) => resolve(data.inspectionDTOs));
  } catch (error) {
    console.error('Error fetching inspections:', error);
    throw error;
  }
};

export const getInspectionDisplays = async (): Promise<InspectionDisplay[]> => {
  let allInspections: Inspection[];
  let allIssues: Issue[];
  try {
    allInspections = await fetchInspections();
    const issuesResponse: Response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/issues`,
    );
    const issuesData: IssueDTO = await issuesResponse.json();
    allIssues = issuesData.issues;
  } catch (err) {
    return new Promise((_resolve, reject) =>
      reject(Error('Unable to fetch inspections and/or issues')),
    );
  }

  const inspectionDisplays: InspectionDisplay[] = [];
  allInspections.forEach((inspection) => {
    const relevantIssueIds = inspection.inspectionIssueKeys.map(
      (el) => el.issueId,
    );
    const relevantIssues = allIssues.filter((issue) =>
      relevantIssueIds.includes(issue.id),
    );
    const inspectionDisplay: InspectionDisplay = {
      id: inspection.id,
      userEmail: inspection.user.email,
      date: inspection.date,
      isSubmitted: inspection.isSubmitted,
      description: inspection.description,
      locationName: inspection.location.name,
      areaName: inspection.area.name,
      reportedToEmails: inspection.reportedTo,
      issues: relevantIssues,
      isSelected: false,
    };
    inspectionDisplays.push(inspectionDisplay);
  });

  return new Promise((resolve) => resolve(inspectionDisplays));
};
