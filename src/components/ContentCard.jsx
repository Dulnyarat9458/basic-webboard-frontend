import '../scss/ContentCard.scss';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
function ContentCard(props) {
    const { contentData } = props;
    const navigate = useNavigate();
    const content_id = contentData.content_id;
    const url = '/fullcontent/' + content_id;
    return (
        <Link to={url}>
            <div className="text-sm card p-4 m-8 rounded-lg ">
                <p className='text-xl font-semibold	mb-4'>{contentData.content_topic}</p>
                <p className='font-light'>Author: {contentData.content_writer}</p>
                <p className='font-light'>Date: {contentData.content_post_time}</p>
            </div>
        </Link>
    );
}

export default ContentCard;
