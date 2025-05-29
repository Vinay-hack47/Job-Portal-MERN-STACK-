// import React from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// const UpdateProfile = ({open , setOpen}) => {
//   return (
//     <div>
//         <Dialog open={open} onOpenChange={setOpen}>

//       <DialogContent className="sm:max-w-[425px] bg-white">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//     </div>
//   )
// }

// export default UpdateProfile



import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import toast from 'react-hot-toast';

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill),
    file: user?.profile?.resume || "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    //update the formData with the new values
    const updatedData = new FormData();
    updatedData.append("fullname", formData.fullname);
    updatedData.append("email", formData.email);
    updatedData.append("phoneNumber", formData.phoneNumber);
    updatedData.append("bio", formData.bio);
    updatedData.append("skills", formData.skills);
    if (formData.file) {
      updatedData.append("file", formData.file);
    }

    console.log(formData);


    try {
      setLoading(true);
      const res = await axios.put("http://localhost:3000/api/v1/user/profile/update", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setOpen(false);
        toast.success(res.data.message);
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.message);
    }
    finally {
      setLoading(false);
    }
  };

  return <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Update your profile details below and click save.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {[
            { id: "fullname", label: "Full Name" },
            { id: "email", label: "Email" },
            { id: "phoneNumber", label: "Phone" },
            { id: "bio", label: "Bio" },
            { id: "skills", label: "Skills" },
            // { id: "resumeUrl", label: "Resume" },
          ].map(({ id, label }) => (
            <div key={id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={id} className="text-right">{label}</Label>
              <Input
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="col-span-3 cursor-pointer"
              />
            </div>
          ))}
          <div className='flex items-center gap-16 '>
            <Label htmlFor="resume">Resume</Label>
            <Input className="cursor-pointer" type="file" id="file" name="file" accept="application/pdf" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData(prev => ({ ...prev, file: file }));
              }
            }} ></Input>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="bg-blue-700 text-white" onClick={handleSave}>

            {loading && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            )}
            {loading ? 'Saving...' : 'Save Changes'}

          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
};

export default UpdateProfile;
