import axios from "axios";

export const generateForm = async (tfURL: string, isHomeTeam: boolean) => {
    let data = JSON.stringify({
        url: tfURL,
        isHomeTeam: isHomeTeam,
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5678/createForm",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    const response = await axios.request(config);
    return response.data;
};
