import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAttribute= createAsyncThunk(
    'attribute/getAttribute',
    async () =>{
        const response =await axios.get('http://localhost:8000/attribute');
        return response.data;
    }
)

export const attributeSlice = createSlice({
  name: 'attribute',
  initialState:{
    data:[],
    status:null
  },
  reducers: {
  },
  extraReducers:{
      [getAttribute.fulfilled]:(state,{payload})=>{
        state.data=payload;
        state.status="success";
      },

      [getAttribute.pending]:(state)=>{
        state.status="loading...";
    },

    [getAttribute.rejected]:(state)=>{
        state.status="failed";

    },
  }
})



export default attributeSlice.reducer