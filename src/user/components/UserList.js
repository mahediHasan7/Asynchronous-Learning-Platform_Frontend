import Card from '../../Shared/components/UIElements/Card';
import UserItem from './UserItem';
import './UserList.css';

const UserList = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          img={user.img}
          name={user.name}
          placeCount={user.placeCount}
        />
      ))}
    </ul>
  );
};

export default UserList;
