import { useState } from 'react';

export const Recipe = () => {
    return (
        <div className="recipe">
            <div className="recipeHeaderArea"></div>

            <div className="recipeSection">
                breakfast
                <div className="recipeSection__recipes">
                    <div className="recipeSection__recipes__recipe"></div>
                </div>
            </div>

            <div className="recipeSection">
                lunch
                <div className="recipeSection__recipes">
                    <div className="recipeSection__recipes__recipe"></div>
                    <div className="recipeSection__recipes__recipe"></div>
                    <div className="recipeSection__recipes__recipe"></div>
                    <div className="recipeSection__recipes__recipe"></div>
                </div>
            </div>
        </div>
    );
};
