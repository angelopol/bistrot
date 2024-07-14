import { validarInventarioMesas } from "../schemes/validacion_inventarioMesas.js";
import { validarListaEspera } from "../schemes/validacion_lista_espera.js";
import { validarReservaMesas } from "../schemes/validacion_reserva_mesas.js";

export class InventarioMesasController{
    mostrarReserva = async (req,res)=>{
        res.render('reserv',{data: null})
    }
    mostrarBar = async (req,res)=>{
        res.render('bar',{data: null})
    }
    mostrarCrearReservas = async (req,res)=>{
        res.render('CrearReservas',{data: null})
    }
    mostrarReservacion = async (req,res)=>{
        res.render('reservacion',{data: null})
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
}