import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
export declare class UserService {
    readonly validatorService: ValidatorService;
    readonly awsS3Service: AwsS3Service;
    constructor(validatorService: ValidatorService, awsS3Service: AwsS3Service);
}
