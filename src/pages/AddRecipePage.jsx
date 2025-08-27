// 
import styles from "./AddRecipePage.module.css";

export default function AddRecipePage() {
  return (
    <>
      <form className={styles.form}>
        <h1 className={styles.title}>Add Recipe</h1>
        <div className={styles["general-info"]}>
          <div>
            <h2 className={styles["general-infotitle"]}>General Information</h2>
            <label>Recipe Title</label>
            <input type="text" placeholder="Enter the name of your recipe" />

            <label>Recipe Description</label>
            <textarea placeholder="Enter a brief description of your recipe"></textarea>

            <div>
              <label>Cooking time in minutes</label>
              <input type="number" placeholder="10" />
            </div>

            <div className={styles["two-cols"]}>
              <div>
                <label>Calories</label>
                <input type="number" placeholder="150" />
              </div>

              <div>
                <label>Category</label>
                <select>
                  <option>Soup</option>
                  <option>Main dish</option>
                  <option>Dessert</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className={styles["uploadphoto-title"]}>Upload Photo</h2>
            <div className={styles["photo-upload"]}>📷</div>
          </div>
        </div>

        <div className={styles.ingredients}>
          <h2>Ingredients</h2>

          <div className={styles["ingredient-row"]}>
            <div className={styles["ingredient-col"]}>
              <label>Name</label>
              <select>
                <option>Broccoli</option>
                <option>Tomato</option>
                <option>Carrot</option>
              </select>
            </div>

            <div className={styles["ingredient-col"]}>
              <label>Amount</label>
              <input type="text" placeholder="100g" />
            </div>
          </div>
          <button type="button" className={styles["add-btn"]}>
            Add new ingredient
          </button>

          <p>
            <b>Name:</b> <span></span> <b>Amount:</b> <span></span>
          </p>
        </div>

        {/* Instructions */}
        <div>
          <h2>Instructions</h2>
          <textarea placeholder="Enter a text"></textarea>
        </div>

        <button type="submit" className={styles["submit-btn"]}>
          Publish Recipe
        </button>
      </form>
    </>
  );
}
