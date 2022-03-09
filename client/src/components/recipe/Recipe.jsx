import { useState } from 'react';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RecipePreview = props => {
    const {setIsModalOpen} = props;

    return(
        <div className="recipePreview clickable" onClick={() => {console.log("ping")}}>
            <div className="recipePreview__ingredientRatio"> 9 / 16 </div>

            <div className="recipePreview__tagBar"> #tag1 #tag2 </div>
        </div>
    );
};

const RecipeModal = () => {
    return(
        <div className="recipeModal">
            <div className="recipeModal__heading">
                <div className="recipeModal__image">
                </div>

                <div className="recipeModal__titleAndDetails">
                    <div className="recipeModal__title">
                        Title
                    </div>

                    <div className="recipeModal__detailTable">
                        <div className="recipeModal__detailRow">
                            <div className="recipeModal__detailColumnLeft"> prep time: </div>
                            <div className="recipeModal__detailColumnRight"> 50 </div>
                        </div>
                        <div className="recipeModal__detailRow">
                            <div className="recipeModal__detailColumnLeft"> cook time: </div>
                            <div className="recipeModal__detailColumnRight"> 160 </div>
                        </div>
                        <div className="recipeModal__detailRow">
                            <div className="recipeModal__detailColumnLeft"> servings: </div>
                            <div className="recipeModal__detailColumnRight"> 4 </div>
                        </div>
                    </div>
                </div>

                <div className="recipeModal__closeModal clickable">
                    <FontAwesomeIcon className="icon" icon={faTimes} size="3x" />
                </div>
            </div>

        </div>
    );
};

export const Recipe = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div className="recipe">
            <div className="recipe__HeaderArea"> </div>

            <div className="recipe__grid">
                <RecipePreview setIsModalOpen={setIsModalOpen}/>

                <RecipePreview setIsModalOpen={setIsModalOpen}/>
                <RecipePreview setIsModalOpen={setIsModalOpen}/>
                <RecipePreview setIsModalOpen={setIsModalOpen}/>

                <RecipePreview setIsModalOpen={setIsModalOpen}/>
                <RecipePreview setIsModalOpen={setIsModalOpen}/>
                <RecipePreview setIsModalOpen={setIsModalOpen}/>
                <RecipePreview setIsModalOpen={setIsModalOpen}/>
            </div>

            {isModalOpen && <RecipeModal/>
            }
        </div>
    );
};
