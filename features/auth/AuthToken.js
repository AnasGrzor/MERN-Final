export const refreshToken = async (req, res) => {
    try {
        token = localStorage.getItem("token");
        const response = await fetch ("https://wizbackend.cyclic.app/auth/refresh", {
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
        }

    } catch (error) {
        console.error(error);
    }
}