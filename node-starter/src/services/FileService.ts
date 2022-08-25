import { ProvideSingleton } from "../ioc";
import * as fs from "fs";
import * as multer from "multer";
import * as mime from "mime-types";

@ProvideSingleton(FileService)
export class FileService {
  public async downloadFile(response: any): Promise<any> {
    response.setHeader(
      "Content-disposition",
      "attachment; filename=nexton-download.png"
    );
    response.setHeader("Content-type", "image/png");

    let readStream = await fs.createReadStream(
      "./src/services/files/nexton-download.png"
    );

    readStream.pipe(response);

    await new Promise((resolve, reject) => {
      readStream.on("end", () => {
        response.end();
        resolve();
      });
    });
  }

  public async uploadFile(request: any) {
    let storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "./src/services/uploads");
      },
      filename: function(req, file, cb) {
        cb(
          null,
          file.fieldname +
            "-" +
            Date.now() +
            "." +
            mime.extension(file.mimetype)
        );
      }
    });

    let upload = multer({ storage });

    const multerSingle = upload.single("nextonUploadFile");

    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }
}
