import { useQuery } from "react-query";
import { fetchStudents } from "../apiRequest";

export function useFetchStudentMutation() {
  return useQuery("students", fetchStudents);
}
