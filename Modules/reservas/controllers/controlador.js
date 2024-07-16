import { validarMesas } from "../schemes/validacion_mesas.js";
import { ReservaController } from "./reserva.js";

export class InventarioMesasController{
    mostrarReserva = async (req,res)=>{
        let rese= new ReservaController();
        let reservas= await rese.getAll(req,res);
        res.render('reservacion',{data: reservas})
    }
    mostrarBar = async (req,res)=>{
        res.render('bar',{data: null})
    }
    mostrarCrearReservas = async (req,res)=>{
        res.render('CrearReservas',{data: null})
    }
    mostrarMesas = async (req,res)=>{
        res.render('mesas',{data: null})
    }
    mostrarCrearEvento = async (req,res)=>{
        res.render('CrearEvento',{data: null})
    }
    mostrarReporte = async (req,res)=>{
        res.render('Reporte',{data: null})
    }
    mostrarModificar = async (req,res)=>{
        res.render('modificarReserva',{data: null})
    }
}