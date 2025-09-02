import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";
import Icon from "../../reuseable/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../hooks/useFavorite";
import FavoriteAuthModal from "../../reuseable/FavoriteAuthModal/FavoriteAuthModal";

export default function RecipesCard({ recipe }) {
  const id = recipe._id;
  const navigate = useNavigate();
  const {
    isFavorite,
    isProcessing,
    isOpenModal,
    closeModal,
    handleToggleFavorite,
  } = useFavorite(id);

  const handleClickLearnMore = () => {
    navigate(`/recipes/${id}`, { state: recipe });
  };

  return (
    <div className={css["card"]}>
      <div className={css.tumb}>
        <img
          src={recipe.thumb}
          alt={recipe.description}
          className={css["card-img"]}
        />
      </div>
      <div className={css["card-header"]}>
        <h3 className={css["card-title"]}>{recipe.title}</h3>
        <Time className={css.time} time={recipe.time} />
      </div>
      <div className={css["card-info"]}>
        <p className={css["card-desc"]}>{recipe.description}</p>
        <Cal cal={recipe.calories} />
      </div>
      <div className={css["card-btn"]}>
        <Button
          className={clsx("white", css.md289)}
          title="Learn more"
          aria-label="Learn more"
          onClick={handleClickLearnMore}
        >
          Learn more
        </Button>
        <Button
          className={isFavorite ? "fill" : "white"}
          title="Add to favorite"
          aria-label="Add to favorite"
          onClick={handleToggleFavorite}
          disabled={isProcessing}
        >
          <Icon
            className={isFavorite ? css.saveFill : css.saveWhite}
            iconName="save-icon"
          />
        </Button>
      </div>
      {isOpenModal && <FavoriteAuthModal onClose={closeModal} />}
    </div>
  );
}
