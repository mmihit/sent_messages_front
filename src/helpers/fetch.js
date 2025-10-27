export const Get = async (url, path, query = {}) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const resp = await fetch(`${url}/${path}?${queryString}`, {
            method: "GET",
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
        const resp = await fetch(`${url}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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