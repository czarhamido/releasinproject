import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const uri='http://localhost:5000'
const initialState = {
  data:[]
};

export const getProdcutsType= createAsyncThunk(
    'products/getProdcutsType',
    async () =>{
        const response =await axios.get(`${uri}/producttype`);
        return response.data;
    }
)

export const CreatProdcutsType= createAsyncThunk(
  'products/CreatProdcutsType',
  async (data) =>{

      const response =await axios.post(`${uri}/producttype`,data);
      return response.JSON().data;
  }
)




export const UpdateProdcutsType= createAsyncThunk(
  'products/UpdateProdcutsType',
  async (data) =>{
      console.log(JSON.parse(data).id);
    const response= await axios.patch(`${uri}/producttype/${JSON.parse(data).id}`,{
      name:JSON.parse(data).name,
      attributes:JSON.parse(data).attributes,
    })
        return response.JSON().data;

      
  }
)

export const productTypeSlice = createSlice({
  name: 'productType',
  initialState,
  reducers: {
  },
  extraReducers:{
      [getProdcutsType.fulfilled]:(state,{payload})=>{
        state.data=payload
      },

  
    [CreatProdcutsType.fulfilled]:(state,{payload})=>{
       state.push(payload);

    },
 
  [UpdateProdcutsType.fulfilled]:(state,{payload})=>{
     const index=state.data.findIndex(pt=>pt._id===payload._id);
     state[index]={
       ...state[index],
       ...payload
     }

  },
  
 

  }
})



export default productTypeSlice.reducer