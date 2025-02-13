import {gql, useMutation} from "@apollo/client";

const REGISTER_USER = gql`
    mutation CreateAuthUser($input: AuthUserCreate!) {
        createAuthUser(input: $input) {
            id
            firstName
            lastName
            email
            createdAt
            updatedAt
        }
    }
`
export default function useCreateAuthUser() {
    const [createAuthUser, {data, loading, error}] = useMutation(REGISTER_USER);

    return {createAuthUser, data, loading, error};
}