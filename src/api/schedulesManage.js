import { axiosIns } from "./api";

// 스케쥴 가져오기(달력포함), 상세보기
export const getSchedules = async () => {
  const {data} = await axiosIns.get("/schedules");
  return data;
}
export const getDetailSchedule = async (scheduleId) => {
  const {data} = await axiosIns.get(`/schedule/${scheduleId}`);
  return data;
}

// 일정 만들기, 일정삭제, 일정 수정
export const postSchedule = async (planData) => {
  const {data} = await axiosIns.post(`/schedule`, planData);
  return data;
}
export const deleteSchedule = async (scheduleId) => {
  const {data} = await axiosIns.delete(`/schedule/${scheduleId}`);
  return data;
}
export const reviseSchedule = async (scheduleId) => {
  const {data} = await axiosIns.put(`/schedule/${scheduleId}`);
  return data;
}