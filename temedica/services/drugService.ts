import { httpClient } from '../config';
import { Drug } from '../types';

export const DRUG_SEARCH_URL = '/drug/search';

export class DrugService {
  static async index(searchKey: string | undefined): Promise<Drug[]> {
    const result = await httpClient.get(
      `${DRUG_SEARCH_URL}${searchKey ? `?q=${searchKey}` : ''}`,
    );
    const serverResponse = result.data;
    if (!serverResponse.success) {
      throw new Error(serverResponse.error);
    }
    return serverResponse.data;
  }
}
