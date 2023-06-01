import { useMutation, useQueryClient } from "react-query";
import { addStudent } from "../apiRequest";

export function useAddStudentMutation() {
  const queryClient = useQueryClient();
  const StudentMutation = useMutation(addStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
  return StudentMutation;
}
