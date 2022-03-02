import axios from 'axios';

export const getData = async (uri) => {
  try {
    const { data } = await axios.get('http://localhost:5000' + uri);
    if (data.success) {
      return data;
    }

    data.results = [];
    return data;
  } catch (error) {
    console.log(error);
    const data = {
      results: []
    };
    return data;
  }
};
