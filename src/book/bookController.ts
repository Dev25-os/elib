import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import path from "path";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files);

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const coverMimType = files?.coverImage[0]?.mimetype.split("/").at(-1);
  const coverFileName = files?.coverImage[0]?.filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    coverFileName
  );

  const FileName = files.file[0].filename;
  const pdfFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    coverFileName
  );

  try {
    const imageUpload = await cloudinary.uploader.upload(filePath, {
      filename_override: coverFileName,
      folder: "cover-image",
      format: coverMimType,
    });

    const pdfUpload = await cloudinary.uploader.upload(pdfFilePath, {
      resource_type: "raw",
      filename_override: FileName,
      folder: "pdf",
      format: "pdf",
    });
  } catch (error) {
    console.log("Error while uploading files", error);
    return next(createHttpError(500, "Error while uploading files"));
  }
  res.json({});
};

export { createBook };
