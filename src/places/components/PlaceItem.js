import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';
import Google from '../../Shared/components/UIElements/Google';
import Modal from '../../Shared/components/UIElements/Modal';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import './PlaceItem.css';

const PlaceItem = (props) => {
  const [mapShown, setMapShown] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const mapDisplayHandler = () => {
    setMapShown(true);
  };
  const mapCloseHandler = () => {
    setMapShown(false);
  };

  // Deletion modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);

    const deletePlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${props.id}`,
          'DELETE',
          null,
          { Authorization: 'Bearer ' + auth.loggedInUser.token }
        );
        props.onDelete(); // to reflect the deletion in the  page
        navigate(`/${auth.loggedInUser.user.id}/places`);
      } catch (error) {
        console.log(error.message);
      }
    };
    deletePlace();
  };

  return (
    <React.Fragment>
      <Modal
        header={props.address}
        footer={<Button onClick={mapCloseHandler}>CLOSE</Button>}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        show={mapShown}
        onClick={mapCloseHandler}
      >
        <div className="map-container">
          <Google center={props.location} zoom={16} />
        </div>
      </Modal>

      <Modal
        animation={false}
        show={showConfirmModal}
        onClick={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`http://localhost:5000/${props.img}`} alt={props.name} />
          </div>
          <div className="place-item__info">
            <h2>{props.name}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={mapDisplayHandler}>
              VIEW ON MAP
            </Button>
            {auth.loggedInUser.user.id === parseInt(props.creator) && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.loggedInUser.user.id === parseInt(props.creator) && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
