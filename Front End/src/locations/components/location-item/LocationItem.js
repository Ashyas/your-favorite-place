import React, {useState, useContext} from "react";

import LoadingSpinner from "../../../shared/components/UiElements/LoadingSpinner";
import ModalWindow from "../../../shared/components/UiElements/ModalWindow";
import ErrorModal from "../../../shared/components/UiElements/ErrorModal";
import Button from "../../../shared/components/FormElements/Button";
import { AuthContext } from "../../../shared/contex/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UiElements/Card"
import Map from "../../../shared/components/UiElements/Map";
import FullScreen from "../../pages/FullScreen";
import "./LocationItem.css"

const LocationItem = props => {
  
  const auth = useContext(AuthContext);
  const [showMap,setShowMap] = useState(false);
  const [isFullScreen, setFullscreen] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();


  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showFullScreen = () => setFullscreen(true);
  
  const showDeleteWarning = () => setConfirmModal(true);
  const cancelDeleteHandeler = () => setConfirmModal(false);

  const confirmDeleteHandeler = async () => {
    setConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`, 
        'DELETE',
        null,
        {
          Authorization: "Bearer " + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (error) {
      
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <ModalWindow
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </ModalWindow>
      {isFullScreen && <FullScreen value={props} />}
      {!isFullScreen && (
        <li className="place-item">
          <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image" onClick={showFullScreen}>
              <img
                src={`http://localhost:5000/${props.image}`}
                alt={props.title}
              />
            </div>
            <div className="place-item__info">
              <h2>{props.title}</h2>
              <h3>{props.address}</h3>
              <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                View On Map
              </Button>
              {auth.userId === props.creatorId && (
                <Button to={`/places/${props.id}`}>Edit</Button>
              )}
              {auth.userId === props.creatorId && (
                <Button danger onClick={showDeleteWarning}>
                  Delete
                </Button>
              )}
            </div>
          </Card>
        </li>
      )}
      <ModalWindow
        show={showConfirmModal}
        onCancel={cancelDeleteHandeler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandeler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandeler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to preceed? this action cannot be undone!</p>
      </ModalWindow>
    </React.Fragment>
  );
}

export default LocationItem;