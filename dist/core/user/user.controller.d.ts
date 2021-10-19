import { UpdateDto } from './dto/update.dto';
import { IFile } from '../../common/interfaces';
export declare class UserController {
    constructor();
    update(file: IFile, user: UpdateDto, id: string): Promise<void>;
}
