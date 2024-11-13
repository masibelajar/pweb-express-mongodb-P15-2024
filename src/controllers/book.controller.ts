import type { NextFunction, Request, Response } from "express";
import BookService from "../services/book.service";
import formatResponse from "@/format/formatResponse";

export class BookController {
  async addBook(req: Request, res: Response) {
    try {
      const book = await BookService.addBook(req.body);
      const response = formatResponse(
        "success",
        "Successfully get all books",
        book,
      );
      res.status(201).json(response);
    } catch (error) {
      const response = formatResponse("failed", error.message);
      res.status(400).json(response);
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const book = await BookService.getAllBooks();
      const response = formatResponse("success", "Successfully get book", book);
      res.status(200).json(response);
    } catch (error) {
      const response = formatResponse("failed", error.message);
      res.status(500).json(response);
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }
      res.json(book);
    } catch (error) {
      const response = formatResponse("failed", error.message);
      res.status(500).json(response);
    }
  }

  async modifyBook(req: Request, res: Response) {
    try {
      const book = await BookService.modifyBook(req.params.id, req.body);
      const response = formatResponse(
        "success",
        "Successfully update book",
        book,
      );
      res.status(200).json(response);
    } catch (error) {
      const response = formatResponse("failed", error.message);
      if (error.message.includes("Invalid book ID format")) {
        res.status(400).json(response);
      } else if (error.message.includes("not found")) {
        res.status(404).json(response);
      } else {
        res.status(500).json(response);
      }
    }
  }

  async removeBook(req: Request, res: Response) {
    try {
      const book = await BookService.removeBook(req.params.id);
      const response = formatResponse(
        "success",
        "Successfully delete book",
        book,
      );
      res.status(200).json(response);
    } catch (error) {
      const response = formatResponse("failed", error.message);
      if (error.message.includes("Invalid book ID format")) {
        res.status(400).json(response);
      } else if (error.message.includes("not found")) {
        res.status(404).json(response);
      } else {
        res.status(500).json(response);
      }
    }
  }
}