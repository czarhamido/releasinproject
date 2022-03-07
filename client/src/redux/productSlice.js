import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const uri='mongodb+srv://czar:0698115172@prog.23wn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const initialState = {
  data:[]
};

export const getProdcut= createAsyncThunk(
    'products/getProdcuts',
    async () =>{
        const response =await axios.get(`${uri}/product`);
        return response.data;
    }
)

export const CreatProdcuts= createAsyncThunk(
  'products/CreatProdcuts',
  async (data) =>{

      const response =await axios.post(`${uri}/product`,data);
      return response.JSON().data;
  }
)

export const UpdateProdcuts= createAsyncThunk(
  'products/UpdateProdcuts',
  async (data) =>{
      console.log(JSON.parse(data).id);
    const response= await axios.patch(`${uri}/product/${JSON.parse(data).id}`,{
      name:JSON.parse(data).name,
      productType:JSON.parse(data).productType,
      assignedAttributes:JSON.parse(data).assignedAttributes
    })
        return response.JSON().data;

      
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers:{
      [getProdcut.fulfilled]:(state,{payload})=>{
        state.data=payload
      },

  
    [CreatProdcuts.fulfilled]:(state,{payload})=>{
       state.push(payload);

    },
 
  [UpdateProdcuts.fulfilled]:(state,{payload})=>{
     const index=state.data.findIndex(pt=>pt._id===payload._id);
     state[index]={
       ...state[index],
       ...payload
     }

  },
 

  }
})



export default productSlice.reducer