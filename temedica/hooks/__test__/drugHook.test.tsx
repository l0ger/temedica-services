import nock from 'nock';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDrugSearch } from '../drugHook';
import { reactQueryHookWrapper } from '../../utils';
import { DRUG_SEARCH_URL } from '../../services/drugService';
import {
  drugSearchResultError,
  drugSearchResultSuccess,
} from '../../__mock__/drugSearchResult';

test('useDrugSearch should correctly return success response', async () => {
  nock(process.env.NEXT_PUBLIC_API_BASE_URL as string)
    .get(`${DRUG_SEARCH_URL}?q=Folic`)
    .reply(200, drugSearchResultSuccess);
  let waitForNextUpdateResult: any = null;
  let renderHookResult: any = null;
  await act(async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useDrugSearch('Folic'),
      {
        wrapper: reactQueryHookWrapper,
      },
    );
    renderHookResult = result;
    waitForNextUpdateResult = waitForNextUpdate;
  });
  await act(async () => {
    waitForNextUpdateResult && (await waitForNextUpdateResult());
  });
  expect(renderHookResult?.current?.data?.length).toEqual(1);
  expect(renderHookResult?.current?.error).toEqual(null);
  expect(renderHookResult?.current?.isSuccess).toEqual(true);
});

test('useDrugSearch should correctly return error response(handled error)', async () => {
  nock(process.env.NEXT_PUBLIC_API_BASE_URL as string)
    .get(`${DRUG_SEARCH_URL}?q=SomeDrug`)
    .reply(200, drugSearchResultError);
  let waitForNextUpdateResult: any = null;
  let renderHookResult: any = null;
  await act(async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useDrugSearch('SomeDrug'),
      {
        wrapper: reactQueryHookWrapper,
      },
    );
    renderHookResult = result;
    waitForNextUpdateResult = waitForNextUpdate;
  });
  await act(async () => {
    waitForNextUpdateResult && (await waitForNextUpdateResult());
  });
  expect(renderHookResult?.current?.data).toEqual(undefined);
  expect(renderHookResult?.current?.error.message).toEqual(
    'Sorry, some thing is wrong, please try later.',
  );
  expect(renderHookResult?.current?.isError).toEqual(true);
});
