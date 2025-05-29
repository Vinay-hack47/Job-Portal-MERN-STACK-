import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useGetSingleCompanyById from '@/hooks/useGetSingleCompanyById'
import { setAllCompanies } from '@/redux/companySlice'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const CompanySetup = () => {
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const companyId = params.id;

  useGetSingleCompanyById(companyId);

  const {singleCompany} = useSelector((state) => state.company);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = new FormData();
    updatedData.append("companyName", input.companyName);
    updatedData.append("description", input.description);
    updatedData.append("website", input.website);
    updatedData.append("location", input.location);
    if (input.file) updatedData.append("file", input.file);          
    //todo If we are updating the image/pdf(logo), we need to append it to the form data , and in that "file" -this should be same as in backed multer
    console.log("updatedData", updatedData);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/company/update/${companyId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // dispatch(setAllCompanies(res.data.updateCompany));
        toast.success(res.data.message);
        setInput({
          companyName: "",
          description: "",
          website: "",
          location: "",
          file: null,
        });
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      companyName: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    })
},[singleCompany, dispatch])

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-20 border p-4 rounded-lg bg-white shadow-md border-gray-200">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              className="bg-blue-700 text-white"
              type="button"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold text-blue-700">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-bold mb-1 text-blue-600">Company Name</Label>
              <Input name="companyName" value={input.companyName} onChange={changeHandler} />
            </div>
            <div>
              <Label className="font-bold mb-1 text-blue-600">Description</Label>
              <Input name="description" value={input.description} onChange={changeHandler} />
            </div>
            <div>
              <Label className="font-bold mb-1 text-blue-600">Website</Label>
              <Input name="website" value={input.website} onChange={changeHandler} />
            </div>
            <div>
              <Label className="font-bold mb-1 text-blue-600">Location</Label>
              <Input name="location" value={input.location} onChange={changeHandler} />
            </div>
            <div>
              <Label className="font-bold mb-1 text-blue-600">Logo</Label>
              <Input type="file" accept="image/*" name="file" onChange={fileChangeHandler}  />
            </div>
          </div>

          <Button
            className="w-full bg-blue-700 text-white mt-5 flex items-center justify-center gap-2 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Setting Up..." : "Setup"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
