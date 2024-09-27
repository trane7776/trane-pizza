import { API } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';

export const useIngredients = () => {
  const [loading, setLoading] = React.useState(true);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const response = await API.ingredients.getAll();
        setIngredients(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
