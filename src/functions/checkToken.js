import Axios from 'axios';
function checkToken() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    Axios.post(`${apiUrl}/api/users/auth`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === "ok" && response.toString !== null) {
                alert("auth success" + token);
            } else {
                localStorage.removeItem('token');
                window.location = '/'
            }
        }).catch((err) => {
            console.error('Error:', err);
        });
}

export default checkToken;
