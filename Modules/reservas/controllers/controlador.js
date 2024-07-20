import { validarMesas } from "../schemes/validacion_mesas.js";
import { ReservaController } from "./reserva.js";
import { ReservaModel } from '../models/reserva.js'
import { logged } from "../../Login/middlewares/logged.js"
import { VerifyCargo } from "../../Register/middlewares/cargo.js"

export class InventarioMesasController{
    mostrarReserva = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        const reservas = await ReservaModel.listarReservas()
        res.render('reservas/reservacion',{data: reservas})
    }
    mostrarBar = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        res.render('reservas/bar',{data: null})
    }
    mostrarCrearReservas = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        res.render('reservas/CrearReservas',{data: null})
    }
    mostrarMesas = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        res.render('reservas/mesas',{data: null})
    }
    mostrarCrearEvento = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        res.render('reservas/CrearEvento',{data: null})
    }
    mostrarReporte = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        res.render('reservas/Reporte',{data: null})
    }
    mostrarModificar = async (req,res)=>{
        if (logged(req, res, false, false)) return
        if (!await VerifyCargo(req, res, 'Reservaciones')) return
        res.render('reservas/modificarReserva',{data: null})
    }
}