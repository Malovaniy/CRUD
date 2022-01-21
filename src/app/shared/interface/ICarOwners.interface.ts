import { ICars } from "./ICars.interfece";

export interface ICarOwners{
     id: number; 
     name: string;
     lname: string;
     sname: string;
     cars: ICars[] 
}