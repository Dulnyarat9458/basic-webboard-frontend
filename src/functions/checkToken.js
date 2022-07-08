import Axios from 'axios';
function checkToken() {
    const token = localStorage.getItem('token');
    Axios.post('http://127.0.0.1:5000/api/users/auth',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log("res: " + response.status)
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
