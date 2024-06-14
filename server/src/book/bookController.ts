import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import path from "path";
import createHttpError from "http-errors";
import { bookModel } from "./bookModel";
import fs, { unlink } from "node:fs";
import { AuthInterface } from "../middlewares/Authenticate";
import { error } from "console";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const coverMimType = files?.coverImage[0]?.mimetype?.split("/").at(-1);
  const coverFileName = files?.coverImage[0]?.filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    coverFileName
  );

  const FileName = files?.file[0]?.filename;
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
    let _req = req as AuthInterface;
    try {
      newBook = await bookModel.create({
        title,
        genre,
        author: _req.userId,
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
    return next(createHttpError(500, "Error while uploading files"));
  }
  res.json({});
};

// update book
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const { bookId } = req.params;

  if (!bookId) {
    return next(createHttpError(400, "Book Id is Required!"));
  }

  // get the book from the db

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(404, "Book does not exist"));
  }

  // check fro the valid author
  let _req = req as AuthInterface;
  if (book.author.toString() !== _req.userId) {
    return next(
      createHttpError(403, "No access or permission to update the book ")
    );
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  let imageUpload;
  if (files.coverImage) {
    const coverFileName = files?.coverImage[0]?.filename;
    const coverMimType = files?.coverImage[0]?.mimetype.split("/").at(-1);
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      coverFileName
    );

    const FileName = files.file[0].filename;

    let data = await cloudinary.uploader.upload(filePath, {
      filename_override: coverFileName,
      folder: "cover-image",
      format: coverMimType,
    });
    imageUpload = data.secure_url;
    await fs.promises.unlink(filePath);
  }

  let pdfFileUpload;
  if (files.file) {
    const FileName = files.file[0].filename;
    // const coverMimType = files?.coverImage[0]?.mimetype.split("/").at(-1);
    const pdfFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      FileName
    );

    let data = await cloudinary.uploader.upload(pdfFilePath, {
      resource_type: "raw",
      filename_override: FileName,
      folder: "file",
      format: "pdf",
    });
    pdfFileUpload = data.secure_url;
    await fs.promises.unlink(pdfFilePath);
  }

  console.log("bookIdbookId", bookId);
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      { _id: bookId },
      {
        title,
        genre,
        coverImage: imageUpload ? imageUpload : book.coverImage,
        file: pdfFileUpload ? pdfFileUpload : book.file,
      },
      { new: true }
    );
  } catch (error) {
    console.log("error update book", error);
  }

  res.status(201).json({ message: "Book updated", data: updateBook });
};

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await bookModel.find().populate("author", "name email");

    res.status(200).json({ data });
  } catch (error) {
    return next(createHttpError(500, "Failed to get books!"));
  }
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const data = await bookModel
      .find({ _id: bookId })
      .populate("author", "name email");
    if (!data) {
      return next(createHttpError(404, "Book not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    return next(createHttpError(500, "Failed to get book!"));
  }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    if (!bookId) {
      return next(createHttpError(404, "bookId is required"));
    }
    const data = await bookModel.findOne({ _id: bookId });
    if (!data) {
      return next(createHttpError(404, "Book not found"));
    }
    let _req = req as AuthInterface;
    if (data.author.toString() !== _req.userId) {
      return next(
        createHttpError(403, "No access or permission to update the book ")
      );
    }

    const temp = data?.coverImage?.split("/").at(-2);
    const coverPublicId =
      temp + "/" + data?.coverImage?.split("/").at(-1)?.split(".").at(-2);

    const temp1 = data?.file?.split("/");
    const pdfPublicId = temp1.at(-2) + "/" + temp1.at(-1);

    await cloudinary.uploader.destroy(coverPublicId);
    await cloudinary.uploader.destroy(pdfPublicId, {
      resource_type: "raw",
    });
    try {
      const deletedBook = await bookModel.deleteOne({ _id: bookId });
      res.status(200).json({ deletedBook });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("error", error);

    return next(createHttpError(500, "Failed to get book!"));
  }
};
export { createBook, updateBook, getBooks, getBook, deleteBook };
