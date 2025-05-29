import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getApplicationById, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").put(isAuthenticated,updateStatus);
router.route("/applicantsById/:id").get(isAuthenticated,getApplicationById);

export default router;