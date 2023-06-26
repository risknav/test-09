import { useState } from "react";
import axios from "axios";
import { error } from "../ReusableComponents/Toaster";
import { getLocalStorageItem } from "../utils/TokenUtils";

const baseUrl = process.env.REACT_APP_API_URL

const useFetchData = () => {
    const [loading, setLoading] = useState(false)
    const Axios = ({ url, method, data, headers = {} }) => {
        setLoading(true);
        return new Promise((resolve) => {
            if (url === "auth/v1/login") {
                axios[method](baseUrl + "/" + url, data)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        error(err.response.data.message)
                    }).finally(() => {
                        setLoading(false)
                    })
            } else {
                
                const axiosInstance = axios.create({
                    baseURL: process.env.REACT_APP_API_URL,
                    headers: {
                        "Authorization": `Bearer ${getLocalStorageItem("userDetails")}`,
                        "Content-Type": "application/json",
                    },
                });

                axiosInstance[method](url, data, headers)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(err.response.data.message)
                    }).finally(() => {
                        setLoading(false)
                    })
            }
        })
    }
    return { Axios, loading };
}

export { useFetchData };
