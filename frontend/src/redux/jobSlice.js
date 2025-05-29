import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
    appliedJobs:[],
    filterJobByText:"",       //At Home Page
  },
  reducers: {
    //actions
    setAllJobs: (state, actions) => {
      state.allJobs = actions.payload;
    },
    setSingleJob: (state, actions) => {
      state.singleJob = actions.payload;
    },
    setAllAdminJobs: (state, actions) => {
      state.allAdminJobs = actions.payload;
    },
    setSearchJobByText: (state, actions) => {
      state.searchJobByText = actions.payload;
    },
    setAppliedJobs:(state, actions)=>{
      state.appliedJobs = actions.payload;
    },
    setFilterJobByText: (state, actions) => {
      state.filterJobByText = actions.payload;
    }
  }
});

export const { setAllJobs } = jobSlice.actions;
export const {setSingleJob} = jobSlice.actions;
export const { setAllAdminJobs } = jobSlice.actions;
export const { setSearchJobByText } = jobSlice.actions;
export const {setAppliedJobs} = jobSlice.actions;
export const {setFilterJobByText} = jobSlice.actions;
export default jobSlice.reducer;
