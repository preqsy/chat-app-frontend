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
const LOGIN_USER = gql`
    mutation LoginUser($input: AuthUserLogin!) {
        loginAuthUser(input: $input) {
            token
        }
    }

`
export const useCreateAuthUser = () => {
    const [createAuthUser, {data, loading, error}] = useMutation(REGISTER_USER);

    return {createAuthUser, data, loading, error};
}

export const useLoginUser = () => {
    const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER)
    return {loginUser, data, loading, error};
}