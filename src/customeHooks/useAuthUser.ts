import { useMutation, useQueryClient } from "react-query";
import { authUser } from "../apiRequest";

export function useAuthUserMutation() {
  const queryClient = useQueryClient();
  const userMutation = useMutation(authUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  return userMutation;
}
