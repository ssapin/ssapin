import React from "react";
import ModalContainer from "../../components/containers/ModalContainer";

interface PlaceDetailProps {
  placeId: number;
  onClose: () => void;
}

function PlaceDetailModal({ placeId, onClose }: PlaceDetailProps) {
  return <ModalContainer onClose={onClose}>{placeId}</ModalContainer>;
}

export default PlaceDetailModal;
