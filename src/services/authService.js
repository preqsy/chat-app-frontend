import {gql, useMutation} from "@apollo/client";

const REGISTER_USER = gql`
    mutation CreateAuthUser($input: AuthUserCreate!) {
        createAuthUser(input: $input) {
            token,
            authUser {
                id
                username
                firstName
                lastName
            }
        }
    }
`
export default function useCreateAuthUser() {
    const [createAuthUser, {data, loading, error}] = useMutation(REGISTER_USER);

    return {createAuthUser, data, loading, error};
}