export const refreshToken = async (req, res) => {
    try {
        token = localStorage.getItem("token");
        const response = await fetch ("http://localhost:4000/auth/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        })

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem("token", data.accessToken);
            console.log(data);
        }
        
    } catch (error) {
        console.error(error);
    }
}