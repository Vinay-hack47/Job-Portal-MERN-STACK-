import { Application } from "../models/appilcation.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req,res) =>{
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if(!jobId){
      return res.status(400).json({message:"Job ID is required", success:false});
    };
    

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
      
    };

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    };

    //create new application
    const newApplication = new Application({
      job: jobId,
      applicant: userId,
    });
    await newApplication.save();

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// user ne kitne job mai apply kiya hai
export const getAppliedJobs = async(req,res) =>{
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId }).populate({
      path: "job",
      options:{sort:{createdAt: -1}},
      populate:{
        path:"company",
        options:{sort:{createdAt: -1}},
      }
    });

    if (!applications) {
      return res.status(404).json({ message: "No applications found", success: false });
    };
    // if (applications.length === 0) {
    //   return res.status(404).json({ message: "No applications found", success: false });
    // }
    return res.status(200).json({
      message: "Applications found",
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// admin dekhega kitne user ne apply kiya hai
export const getApplicants = async(req,res) =>{
  try {
    const jobId = req.params.id;
    if(!jobId){
      return res.status(400).json({message:"Job ID is required", success:false});
    };

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options:{sort:{createdAt: -1}},
      populate:{path:"applicant"},
    });
    if(!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    // if (job.applications.length === 0) {
    //   return res.status(404).json({ message: "No applications found", success: false });
    // };

    return res.status(200).json({
      message: "Applications found",
      success: true,
      job
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateStatus = async(req,res) =>{
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status || !applicationId){
      return res.status(400).json({message:"Status and Application ID are required", success:false});
    };

    const application = await Application.findOne({_id: applicationId});
    if(!application) {
      return res.status(404).json({ message: "Application not found", success: false });
    };

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getApplicationById = async(req,res) =>{
  try {
    const applicationId = req.params.id;
    if(!applicationId){
      return res.status(400).json({message:"Application ID is required", success:false});
    };

    const application = await Application.findById(applicationId)

    if (!application) {
      return res.status(404).json({ message: "Application not found", success: false });
    };
    return res.status(200).json({
      message: "Application found",
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}