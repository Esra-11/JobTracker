import axiosInstance from './axiosInstance'

export function getApplications() {
  return axiosInstance.get("/applications");
}
