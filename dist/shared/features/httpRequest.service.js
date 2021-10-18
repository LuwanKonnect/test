"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestService = void 0;
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let HttpRequestService = class HttpRequestService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async httpGetRequest(url) {
        const res = this.httpService.get(url).pipe(operators_1.map((axiosResponse) => {
            return axiosResponse.data;
        }));
        return await rxjs_1.lastValueFrom(res).then((resp) => {
            return resp;
        });
    }
    async httpPostRequest(url, body) {
        const res = this.httpService.post(url, body).pipe(operators_1.map((axiosResponse) => {
            return axiosResponse.data;
        }));
        return await rxjs_1.lastValueFrom(res).then((resp) => {
            return resp;
        });
    }
};
HttpRequestService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpRequestService);
exports.HttpRequestService = HttpRequestService;
//# sourceMappingURL=httpRequest.service.js.map