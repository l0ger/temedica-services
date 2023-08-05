import { useQuery } from 'react-query';
import { Drug } from '../types';
import { DrugService } from '../services/drugService';

export const useDrugSearch = (searchWord: string | undefined) => {
  return useQuery<Drug[]>(
    ['drugs', searchWord || ''],
    () => {
      return DrugService.index(searchWord);
    },
    {
      staleTime: 1000 * 60 * 5, //5 minutes
    },
  );
};
