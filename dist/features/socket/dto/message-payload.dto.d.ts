import { MessageDto } from './message.dto';
declare const MessagePayloadDto_base: import("@nestjs/common").Type<Omit<MessageDto, "id" | "createdAt" | "updatedAt">>;
export declare class MessagePayloadDto extends MessagePayloadDto_base {
}
export {};
