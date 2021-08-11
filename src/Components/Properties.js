import React, { useCallback, useEffect, useState } from 'react';
import PropertiesServices from '../Services/properties.services';
import PropertiesFilter from './PropertiesFilter';
import TableProperties from './TableProperties';

const Properties = () => {

    const [rows, setRows] = useState([]);
    const [years, setYears] = useState([]);
    const [cities, setCities] = useState([]);
    const [filtersTable, setFiltersTable] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);

    const addFilterTable = (filterInfo) => {
        setFiltersTable(filterInfo);
      };

    const getProperties = useCallback(async () => {

        const filters = filtersTable !== null && filtersTable;
        console.log(filtersTable,filters)
        let body;
        if (filters) {
            body = {
                ...filters
            };
        }else{
            body={

            }
        }
        const propertiesServices = new PropertiesServices();
        const response = await propertiesServices.getProperties(body);

        if (response?.status === 200) {
            const filterStatus = response.data.filter(s => s.status === "pre_venta" || s.status === "en_venta" || s.status === "vendido");//Se filtra solo por los estados que debe ver el usuario
            setRows(filterStatus);
            getYears();
            getCities();
        } else {
            setRows([]);
        }


    }, [filtersTable]);

    const getYears = useCallback(async () => {
        const propertiesServices = new PropertiesServices();
        const response = await propertiesServices.getYears();
        if (response?.status === 200) {
            setYears(response.data);
        } else {
            setYears([]);
        }

    }, []);

    const getCities= useCallback(async () => {
        const propertiesServices = new PropertiesServices();
        const response = await propertiesServices.getCities();
        if (response?.status === 200) {
            setCities(response.data);
        } else {
            setCities([]);
        }


    }, []);

    useEffect(() => {
        if (filtersTable && !isFiltered) {
          setIsFiltered(true);
          getProperties();
      
        }
      }, [filtersTable, getProperties, isFiltered]);

    useEffect(()=>{
        getProperties()
    },[getProperties])
    return (
        <React.Fragment>
            <PropertiesFilter years={years} cities={cities} addFilterTable={addFilterTable} setIsFiltered={setIsFiltered}/>
            <TableProperties properties={rows}/>
        </React.Fragment>

    );
};

export default Properties;