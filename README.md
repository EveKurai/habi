# Habi

Tecnologías utilizadas

Back: 
	Lenguaje Python 3.8
	Framework flask para la creación de los MS
Front:
	Lenguaje React
	Framework Material UI
Postman

SERVICES

GET localhost:4000/properties/cities/
Permite obtener las ciudades por las cuales filtrara el usuario

POST localhost:4000/properties/filters/

Payload

{
   "status":"pre_venta",
   "city":"bogota",
   "year":2018
}

Permite obtener todas las propiedades

GET localhost:4000/properties/years/
Permite obtener los años de construcción por los cuales filtrara el usuario

Los servicios GET funcionaran como catálogos para llenar los autocomplete


Modelo entidad relación

Basados en la tabla ya existente de propiedades se creará tabla historica que permitirá ver por propiedad los likes que almacena como se observa una propiedad puede tener muchos likes la columna total_like funcionará como acomodador para luego poder tener un total de likes almacenados de forma númerica, se crea adicionalmente la tabla users para identificar qué usuario es el que da el like.
