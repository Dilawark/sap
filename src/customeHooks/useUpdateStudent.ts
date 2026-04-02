import { useMutation, useQueryClient } from "react-query";
import { updateStudent } from "../apiRequest";

export function useUpdateStudentMutation() {
  const queryClient = useQueryClient();
  const updateStudentMutation = useMutation(updateStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
  return updateStudentMutation;
}
