import React from "react";

import Icon  from "../../../reuseable/Icon/Icon";
// import "./FavoriteButton.css";
import { useFavoriteHandler } from "../../hooks/useFavoriteHandler";

const FavoriteButton = ({ id, isFavorite, isLoggedIn, openModal }) => {
  const { handleClickAddFavorite, isProcessing } = useFavoriteHandler({
    isLoggedIn,
    id,
    isFavorite,
    openModal,
  });

  return (
    <button
      onClick={handleClickAddFavorite}
      disabled={isProcessing}
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
    >
      {isFavorite ? (
        <>
          Unsave <Icon className="saveWhite" iconName="save-icon" />
        </>
      ) : (
        <>
          Save <Icon className="saveFill" iconName="save-icon" />
        </>
      )}
    </button>
  );
};

export default FavoriteButton;
