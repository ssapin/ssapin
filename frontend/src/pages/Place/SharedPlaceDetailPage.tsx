import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlaceInfoModal from "./PlaceInfoModal";

function SharedPlaceDetail() {
  const { placeId } = useParams();
  const [createModalOpen, setCreateModalOpen] = useState(true);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {createModalOpen && (
        <PlaceInfoModal
          placeId={Number(placeId)}
          onClose={() => setCreateModalOpen(false)}
        />
      )}
    </>
  );
}

export default SharedPlaceDetail;
