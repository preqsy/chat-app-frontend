import axios from "axios";

const API_URL = "http://localhost:8080";

export const registerUser = async (payload) => {
    try {
        const response = await axios.post(API_URL + "/register", payload);
        console.log(response.data);
        return response.data
    }
    catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}
