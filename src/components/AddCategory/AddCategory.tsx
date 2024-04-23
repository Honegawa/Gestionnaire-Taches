import { useState } from 'react'
import axios from 'axios'
import { URL } from '../../utils/constants/url'
import { Category } from '../../interfaces/category'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxMzc5MzMwNSwiZXhwIjoxNzEzODc5NzA1fQ.yIksas2PzmXh94OEYAvvNSu6efCBw74PS1ypScFW--8"

const AddCategory = () => {

  const [category,setCategory]= useState({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCategory((category: Category) => ({ ...category, [name]: value })) 
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try{
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      };
      const response = await axios.post(URL.CATEGORIES, { ...category}, { headers: headers }) 
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }
 
  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
        type='text'
        placeholder='category'
        name='name'
        onChange={handleChange}
        />
        <button type="submit">ok</button>
      </form>
    </div>
  );
};

export default AddCategory;