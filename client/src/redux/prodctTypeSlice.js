import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const uri='mongodb+srv://ahmeidi:0698115172hamido@main.rttby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const initialState = {
  data:[]
};

export const getProdcutsType= createAsyncThunk(
    'products/getProdcutsType',
    async () =>{
        const response =await axios.get("mongodb+srv://ahmeidi:0698115172hamido@main.rttby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/producttype");
        return response.data;
    }
)

export const CreatProdcutsType= createAsyncThunk(
  'products/CreatProdcutsType',
  async (data) =>{

      const response =await axios.post("mongodb+srv://ahmeidi:0698115172hamido@main.rttby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/producttype",data);
      return response.JSON().data;
  }
)




export const UpdateProdcutsType= createAsyncThunk(
  'products/UpdateProdcutsType',
  async (data) =>{
      console.log(JSON.parse(data).id);
    const response= await axios.patch(`mongodb+srv://ahmeidi:0698115172hamido@main.rttby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/producttype/${JSON.parse(data).id}`,{
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