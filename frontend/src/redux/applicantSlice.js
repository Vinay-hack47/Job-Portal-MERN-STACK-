import {createSlice} from "@reduxjs/toolkit"

const applicantSlice = createSlice({
  name:"applicant",
  initialState:{
    allApplicants: [],
  },
  reducers:{
    //actions
    setAllApplicants:(state, action) =>{
      state.allApplicants = action.payload;
    },
  }
})

export const {setAllApplicants} = applicantSlice.actions;
export default applicantSlice.reducer;