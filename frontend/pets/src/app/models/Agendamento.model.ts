export class Agendamento {
    idAgendamento: number;
    idUsuario: number;
    idCliente: number;
    idAnimal: number;
    dataAgendamento: string; // Usando string para representar a data
    horaAgendamento: string; // Usando string para representar a hora
    status: string;

    constructor(idAgendamento: number, idUsuario: number, idCliente: number, idAnimal: number, dataAgendamento: string, horaAgendamento: string, status: string) {
        this.idAgendamento = idAgendamento;
        this.idUsuario = idUsuario;
        this.idCliente = idCliente;
        this.idAnimal = idAnimal;
        this.dataAgendamento = dataAgendamento;
        this.horaAgendamento = horaAgendamento;
        this.status = status;
    }
}