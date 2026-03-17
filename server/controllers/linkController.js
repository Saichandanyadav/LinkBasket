import mongoose from "mongoose";
import Link from "../models/Link.js";

export const createLink = async (req, res) => {
  const link = await Link.create(req.body);
  res.json(link);
};

export const getLinks = async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const links = await Link.find(query);
  res.json(links);
};

export const getLinkById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    await Link.findByIdAndDelete(id);

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};