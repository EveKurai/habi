import axios from 'axios';


class PropertiesServices {

    constructor() {
      if (!!PropertiesServices.instance) {
        return PropertiesServices.instance;
      }
  
      PropertiesServices.instance = this;
  
      return this;
    }
 
   
    apiProperties = `http://localhost:4000/properties`;  
   
    getProperties = async (body) => {
      try {
        const response = await axios.post(`${this.apiProperties}/filters/`,body);
        return response;
      } catch (error) {
        return error.response;
      }
    };

    getYears = async () => {
      try {
        const response = await axios.get(`${this.apiProperties}/years/`);
        return response;
      } catch (error) {
        return error.response;
      }
    };
  
    getCities = async () => {
      try {
        const response = await axios.get(`${this.apiProperties}/cities/`);
        return response;
      } catch (error) {
        return error.response;
      }
    };
  }
  
  export default PropertiesServices;