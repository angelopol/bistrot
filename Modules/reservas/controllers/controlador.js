import { validarInventarioMesas } from "../schemes/validacion_inventarioMesas";
import { validarListaEspera } from "../schemes/validacion_lista_espera";
import { validarReservaMesas } from "../schemes/validacion_reserva_mesas";

export class InventarioMesasController{
    mostrarReserva = async (req,res)=>{
        res.render('reserv',{data: null})

    }
}