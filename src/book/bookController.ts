import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import path from "path";
import createHttpError from "http-errors";
import { bookModal } from "./bookModal";
import fs from "node:fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

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
    FileName
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

    let newBook;
    try {
      newBook = await bookModal.create({
        title,
        genre,
        author: "6661e26160bcbf3118b627df",
        coverImage: imageUpload.secure_url,
        file: pdfUpload.secure_url,
      });
    } catch (error) {
      return next(createHttpError(500, "Failed to create book"));
    }

    // delete temp files
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(pdfFilePath);
  } catch (error) {
    console.log("Error while uploading files", error);
    return next(createHttpError(500, "Error while uploading files"));
  }
  res.json({});
};

export { createBook };
