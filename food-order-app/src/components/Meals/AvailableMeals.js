import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchMeals = async () => {

      const res = await fetch('https://food-app-59c50-default-rtdb.firebaseio.com/meals.json');
      const data = await res.json();

      let loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);

    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>Error {error}</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map(
    (meal) => <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price} />
  );
  return (
    <section className={classes.meals}>
      <Card><ul>{mealsList}</ul></Card>
    </section>
  )
};
export default AvailableMeals;