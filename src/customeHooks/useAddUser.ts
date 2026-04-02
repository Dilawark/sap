import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../apiRequest";

export function useAddUserMutation() {
  const queryClient = useQueryClient();
  const userMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  return userMutation;
}
