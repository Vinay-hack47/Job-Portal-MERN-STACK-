import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists with this name",
        success: false,
      });
    }

    let newCompany = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      newCompany,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering company" });
  }
};

//get all companies

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    let user = await User.findById(userId);
    let companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Company's created by ${user.fullname}`,
      success: true,
      companies,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error getting company" });
  }
};

//get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res
      .status(200)
      .json({ message: `Company found`, success: true, company });
  } catch (error) {
    return res.status(500).json({ message: "Error getting company" });
  }
};

//update company by id

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log("companyId", companyId);
    
    const { companyName, description, website, location } = req.body;
    console.log(companyName, description, website, location);

    const file = req.file;
    console.log("file", file);

    let cloudResponse;
    let logoUrl;

    if(file){
      const fileUri = getDataUri(file);
      console.log("fileUri", fileUri);
      // idhar cloudinary ka code dalna hai
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logoUrl = cloudResponse.secure_url;
    }

 

    const updatedData = {
      name: companyName,
      description,
      website,
      location,
      ...(logoUrl && { logo: logoUrl }), // only add logo if available
    };
    console.log("updatedData", updatedData);

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updatedData,
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      updatedCompany,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating company" });
  }
};
