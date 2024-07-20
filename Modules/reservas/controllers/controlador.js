import { validarMesas } from "../schemes/validacion_mesas.js";
import { ReservaController } from "./reserva.js";
import { ReservaModel } from '../models/reserva.js'

export class InventarioMesasController{
    mostrarReserva = async (req,res)=>{
        const reservas = await ReservaModel.listarReservas()
        res.render('reservas/reservacion',{data: reservas})
    }
    mostrarBar = async (req,res)=>{
        res.render('reservas/bar',{data: null})
    }
    mostrarCrearReservas = async (req,res)=>{
        res.render('reservas/CrearReservas',{data: null})
    }
    mostrarMesas = async (req,res)=>{
        res.render('reservas/mesas',{data: null})
    }
    mostrarCrearEvento = async (req,res)=>{
        res.render('reservas/CrearEvento',{data: null})
    }
    mostrarReporte = async (req,res)=>{
        res.render('reservas/Reporte',{data: null})
    }
    mostrarModificar = async (req,res)=>{
        res.render('reservas/modificarReserva',{data: null})
    }
}