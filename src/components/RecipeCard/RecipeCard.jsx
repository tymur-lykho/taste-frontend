import clsx from "clsx";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import { Button } from "../Button/Button";
import Icon from "../../reuseable/Icon/Icon";
import css from "./RecipeCard.module.css";
import { useFavorite } from "../hooks/useFavorite";
import FavoriteAuthModal from "../../reuseable/FavoriteAuthModal/FavoriteAuthModal";
import { useNavigate } from "react-router-dom";

export default function RecipesCard({ recipe }) {
  const navigate = useNavigate();
  const {
    isOwnRecipesRoute,
    isFavorite,
    isProcessing,
    isOpenModal,
    closeModal,
    handleToggleFavorite,
  } = useFavorite(recipe);

  const handleClickLearnMore = () => {
    navigate(`/recipes/${recipe.id}`, { state: recipe });
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

        {!isOwnRecipesRoute && (
          <Button
            className={clsx("white", {
              [css.favoriteActive]: isFavorite,
            })}
            title={isFavorite ? "Remove from favorite" : "Add to favorite"}
            aria-label={isFavorite ? "Remove from favorite" : "Add to favorite"}
            onClick={handleToggleFavorite}
            disabled={isProcessing}
          >
            <Icon
              className={clsx(css["save-icon"], {
                [css.active]: isFavorite,
              })}
              iconName="save-icon"
            />
          </Button>
        )}
      </div>
      {isOpenModal && <FavoriteAuthModal onClose={closeModal} />}
    </div>
  );
}
