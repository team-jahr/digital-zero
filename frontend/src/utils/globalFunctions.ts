import axios from 'axios';
import { Issue } from '../types/types';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const submitIssue = async (issueData: Issue): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/api/issue`, issueData);
    console.log('Issue saved successfully!');
  } catch (error) {
    console.error('Error saving issue:', error);
    throw error;
  }
}
export const deleteIssue = async (issueId: number): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/api/issue/${issueId}`);
    console.log('Issue deleted successfully!');
  } catch (error) {
    console.error('Error deleting issue:', error);
    throw error;
  }
}

export const updateIssue = async (issueId: number, updatedIssueData: Issue): Promise<void> => {
  try {
    await axios.put(`${apiUrl}/api/issue/${issueId}`, updatedIssueData);
    console.log('Issue updated successfully!');
  } catch (error) {
    console.error('Error updating issue:', error);
    throw error;
  }
}

export const getIssue = async (issueId: number): Promise<Issue> => {
  try {
    const response = await axios.get(`${apiUrl}/api/issue/${issueId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting issue:', error);
    throw error;
  }
}

export const getAllIssues=  async (): Promise<Issue[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/issues`);
    return response.data;
  } catch (error) {
    console.error('Error getting all issues:', error);
    throw error;
  }
}

