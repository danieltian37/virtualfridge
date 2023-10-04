import fridgeVector from '.././assets/fridgevector.svg'
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <>
        <div>
          <h1>virtual<br/>refrigerator</h1>
          <a target="_blank">
            <Link to="/fridge">
                <img src={fridgeVector} className="logo" alt="Virtual fridge logo" />
            </Link>
          </a>
        </div>
    
        <p className="b">
          created by daniel tian
        </p>
    
      
        </>
    );
}

export default Home;