import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Loader2, XCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://career-path-hqsu.onrender.com/api/v1/company/register",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });

      if (res.data.success) {
        
        const companyId = res?.data?.newCompany?._id;
        navigate(`/admin/companies/create/${companyId}`);
        toast.success(res.data.message);
        dispatch(setSingleCompany(res.data.newCompany));
        setCompanyName("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="my-30 flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full  max-w-md shadow-xl rounded-2xl border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Building2 size={40} className="text-blue-600" />
              <div>
                <h2 className=" text-black font-bold text-xl ">Create New Company</h2>
                <p className="text-sm text-gray-700">What would you like to give your company name? You can change it later. </p>
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div >
                <label className="block text-sm font-medium text-black mb-1">Company Name</label>
                <Input
                  type="text"
                  placeholder="e.g. Google, Meta, Infosys"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

             <div className="flex  gap-8 mt-4 justify-center">
              <Button
                type="button"
                variant="outline"
                className="w-fit bg-blue-700 text-white cursor-pointer"
                onClick={() => navigate("/admin/companies")}
              >
                <XCircle className="w-4 h-4 text-red-500" />
                Cancel
              </Button>
             <Button type="submit" className="w-full bg-blue-700 text-white cursor-pointer w-fit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Creating...
                  </div>
                ) : (
                  "Create Company"
                )}
              </Button>
             </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyCreate;
