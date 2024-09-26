'use client';

import React from 'react';

import { API } from '@/services/api-client';
import { Ingredient } from '@prisma/client';

interface ReturnFilterIngredientsProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useFilterIngredients = (): ReturnFilterIngredientsProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);
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
