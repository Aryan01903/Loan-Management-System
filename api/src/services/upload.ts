import cloudinary from "../config/cloudinary";

class UploadService {
  static async uploadFile(fileBuffer: Buffer, folder: string) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(fileBuffer);
      });

      response.data = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default UploadService;