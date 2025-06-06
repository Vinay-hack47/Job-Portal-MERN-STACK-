import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    allCompanies: [],
    searchCompanyByText:"",
    filterCompany:[],
  },
  reducers:{
    //actions
    setSingleCompany:(state, actions) =>{
      state.singleCompany = actions.payload;
    },
    setAllCompanies:(state, actions) =>{
      state.allCompanies = actions.payload;
    },
    setSearchCompanyByText:(state, actions) =>{
      state.searchCompanyByText = actions.payload;
    },
    setFilterCompany:(state, actions) =>{
      state.filterCompany = actions.payload;
    },
  }
})

export const {setSingleCompany} = companySlice.actions;
export const {setAllCompanies} = companySlice.actions;
export const {setSearchCompanyByText} = companySlice.actions;
export const {setFilterCompany} = companySlice.actions;
export default companySlice.reducer;