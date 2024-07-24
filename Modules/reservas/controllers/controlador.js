import { validarMesas } from "../schemes/validacion_mesas.js";
import { ReservaController } from "./reserva.js";
import { ReservaModel } from '../models/reserva.js'
import { ComidaModel } from "../../cocina/models/mysql/comida.js";

export class InventarioMesasController{
    mostrarReserva = async (req,res)=>{
        const reservas = await ReservaModel.listarReservas()
        res.render('reservas/reservacion',{data: reservas,
        })
    }
    mostrarBar = async (req,res)=>{
        res.render('reservas/bar',{data: null})
    }
    mostrarCrearReservas = async (req,res)=>{
        const comidas = await ComidaModel.getAll({})
        res.render('reservas/CrearReservas',{comidas: comidas })
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
    mostrarReporteCocina = async (req,res)=>{
        const comidas = await ComidaModel.getAll({})
        const reservas = await ReservaModel.listarReservas()
        res.render('reservas/ReporteCocina',{comidas: comidas,
            reservas: reservas})
        
    }
}