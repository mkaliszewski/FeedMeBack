import fetchMock from 'fetch-mock';
import { cleanup } from '@testing-library/react';

type ReqType = 'get' | 'post' | 'put' | 'delete';

type FetchMock = (reqType: ReqType, route: string, status: number, data: any) => void;

const mockRequest: FetchMock = (reqType = 'get', route = '/', status, data) => {
    return fetchMock[reqType](route, {
        status,
        body: {
            ...data,
        },
    });
};

beforeEach(() => fetchMock.reset());
afterEach(() => cleanup());

export default mockRequest;
