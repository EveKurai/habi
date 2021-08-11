import React, { useState, useCallback, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Styles from './Properties.module.css';

const PropertiesFilter = (props) => {
  const {years, cities, addFilterTable, setIsFiltered} = props;
  const [statusFilter, setStatusFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [filterDisabled, setFilterDisabled] = useState(true);

  
  const handleCleanFilter = () => {
    setStatusFilter(null);
    setCityFilter(null);
    setYearFilter(null);
    setIsFiltered(true);
    addFilterTable(null);
  };
  const applyFilter =useCallback (()=> {
 
    const dateStatus = statusFilter && { status: statusFilter.value }
    const dateYear = yearFilter && {year: yearFilter.value}
    const dateCity = cityFilter && {city: cityFilter.value}

    const objFilter = {
        ...dateStatus,
        ...dateYear,
        ...dateCity
    };
    setIsFiltered(false);
    addFilterTable(objFilter);

  },[statusFilter, yearFilter, cityFilter, addFilterTable, setIsFiltered]);

  useEffect(() => {
    if (statusFilter || yearFilter || cityFilter ) {
        setFilterDisabled(false);
    } else {
      if (!filterDisabled) {
        setFilterDisabled(true);
        applyFilter();
      }
    }
  }, [applyFilter,filterDisabled,statusFilter, yearFilter, cityFilter]);

  const status = [
    { title: 'pre venta', value:'pre_venta' },
    { title: 'en venta', value:'en_venta'},
    { title: 'vendido', value:'vendido'}
];

  return (
    <div className={Styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={status}
            getOptionLabel={option => option.title}           
            onChange={(e, data) => {
              setStatusFilter(data);
            }}
            value={statusFilter}
            renderInput={params =>
              <TextField
                {...params}
                label="Estado"
                variant="outlined"
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={years}
            getOptionLabel={option => option.title}           
            onChange={(e, data) => {
              setYearFilter(data);
            }}
            value={yearFilter}
            renderInput={params =>
              <TextField
                {...params}
                label="Año de construcción"
                variant="outlined"
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            options={cities}
            getOptionLabel={option => option.title}           
            onChange={(e, data) => {
              setCityFilter(data);
            }}
            value={cityFilter}
            renderInput={params =>
              <TextField
                {...params}
                label="Ciudad"
                variant="outlined"
              />
            }
          />
        </Grid>
        
          <Grid item xs={12} md={1}>
            <Button
              color="primary"
              variant="contained"
              onClick={applyFilter}
              disabled={filterDisabled}
            >
              Filtrar
        </Button>
        </Grid>
        <Grid item xs={12} md={2}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleCleanFilter}
              disabled={filterDisabled}
            >
              Limpiar Filtros
        </Button>
          </Grid>
      </Grid>
    </div>
  );
};


export default PropertiesFilter;