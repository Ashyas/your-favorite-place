import React, {useState, useContext} from "react";

import "./LocationItem.css"
import Card from "../../../shared/components/UiElements/Card"
import Button from "../../../shared/components/FormElements/Button";
import FullScreen from "../../pages/FullScreen";
import ModalWindow from "../../../shared/components/UiElements/ModalWindow";
import Map from "../../../shared/components/UiElements/Map";
import { AuthContext } from "../../../shared/contex/auth-context";

const LocationItem = props => {
  
  const auth = useContext(AuthContext);
  const [showMap,setShowMap] = useState(false);
  const [isFullScreen, setFullscreen] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showFullScreen = () => setFullscreen(true);
  
  const showDeleteWarning = () => setConfirmModal(true);
  const cancelDeleteHandeler = () => setConfirmModal(false);

  const confirmDeleteHandeler = () => {
    setConfirmModal(false);
    console.log('deleting...');
  }

  return (
    <React.Fragment>
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
      {isFullScreen && 
        <FullScreen value={props}/>
      }
      {!isFullScreen &&
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image" onClick={showFullScreen} >
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>View On Map</Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
            {auth.isLoggedIn && <Button danger onClick={showDeleteWarning}>Delete</Button>}
          </div>
        </Card>
      </li>
      }
      <ModalWindow 
        show={showConfirmModal} 
        onCancel={cancelDeleteHandeler}
        header="Are you sure?" 
        footerClass="place-item__modal-actions" 
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandeler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandeler}>Delete</Button>
          </React.Fragment>
        }>
        <p>Are you sure you want to preceed? this action cannot be undone!</p>
      </ModalWindow>
    </React.Fragment>
  );
}

export default LocationItem;