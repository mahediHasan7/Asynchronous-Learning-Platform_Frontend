import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
  if (props.places.length === 0) {
    return (
      <div className="center">
        <Card>
          <p>No Place found! want to create want?</p>
          <Button to="/places/new">Create a new place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.places.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            name={place.title}
            img={place.image}
            address={place.address}
            description={place.description}
            location={place.location}
            creator={place.creator}
            onDelete={props.updateOnDelete}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
