import '../scss/Form.scss';
import { useLocation, useNavigate } from 'react-router-dom';

function StagePage() {
    const navigate = useNavigate();
    const location = useLocation();
    setTimeout(redirect, 3000)
    function redirect() {
        navigate('/');
    }
    return (
        <div className='box '>
            <div className='panel p-8 m-4 rounded-lg '>
                <p className="text-center main-topic font-bold text-2xl">{location.state.msg}</p>
                <br></br>
                <p className="text-center  text-lg">Redirecting...</p>
            </div>
        </div>

    );
}

export default StagePage;
