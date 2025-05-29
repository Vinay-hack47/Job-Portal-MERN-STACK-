import { Job } from "../models/job.model.js";

// admin post job
export const postJob = async (req, res) => {
  try {
    const userId = req.id;
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      jobType,
      location,
      position,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !jobType ||
      !location ||
      !position
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const companyId = req.params.id;

    let job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel: experience,
      jobType,
      location,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//student k liye jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }

    return res.status(200).json({
      message: "Jobs found",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "company",
      })
      .populate({ path: "applications" }); //! understand the populate , based on it we have checked in job description page if user has applied or not
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Job found",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//admin kitne job create hue hain
export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id; //abi recruiter logged in hain toh uska id milega

    const jobs = await Job.find({ created_by: userId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }

    return res.status(200).json({
      message: "Jobs found",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
