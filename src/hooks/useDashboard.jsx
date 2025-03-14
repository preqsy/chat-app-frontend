import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_USER = gql `
    query GetCurrentUser($token:String!) {
        getCurrentUser(token:$token) {
            email,
            username,
            firstName,
            lastName,
            createdAt
        }
    }

`
export const useGetCurrentUser = () => {
    const token = localStorage.getItem("token")
    const {data, loading, error} = useQuery(GET_CURRENT_USER, {fetchPolicy: "network-only", variables:{token}})
    
    
    return { data, loading, error}
}
