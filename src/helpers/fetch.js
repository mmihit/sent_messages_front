import { GetToken } from "./token";

export const Get = async (url, path, query = {}) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const token = await GetToken();
        const resp = await fetch(`${url}${path}?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token || ""}`
            },
        })
        const data = await resp.json()
        if (!resp.ok) {
            console.log(`HTTP error! status:${data.status}`)
        }

        return data
    } catch (error) {
        throw error;
    }
}

export const Post = async (url, path, body) => {
    try {
        const token = await GetToken();
        const resp = await fetch(`${url}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token || ""}`
            },
            body: JSON.stringify(body),
        })
        const data = await resp.json()
        if (!resp.ok) {
            console.log(`HTTP error! status:${data.status}`)
        }

        return data

    } catch (error) {
        throw error;
    }
}