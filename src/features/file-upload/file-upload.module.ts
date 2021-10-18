import { Global, Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Global()
@Module({
  imports: [
    // MulterModule.register({
    //   storage: diskStorage({
    //     // file destination
    //     destination: `./uploads/${
    //       new Date().getMonth() + '-' + new Date().getFullYear()
    //     }`,
    //     filename: (req, file, cb) => {
    //       // rename the file
    //       // const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
    //       // return cb(null, filename);
    //       return cb(null, file.originalname);
    //     },
    //   }),
    // }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
