import { HttpService } from '@nestjs/axios';
export declare class HttpRequestService {
    private readonly httpService;
    constructor(httpService: HttpService);
    httpGetRequest(url: string): Promise<any>;
    httpPostRequest(url: string, body: any): Promise<any>;
}
