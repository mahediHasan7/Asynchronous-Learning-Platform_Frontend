import { Link } from 'react-router-dom';
import Card from '../../Shared/components/UIElements/Card';
import Avatar from '../../Shared/components/UIElements/Avatar';
import './UserItem.css';

const UserItem = (props) => {
  console.log(`http://localhost:5000/${props.img}`);
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`http://localhost:5000/${props.img}`}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
