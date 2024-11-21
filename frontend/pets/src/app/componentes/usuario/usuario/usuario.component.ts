import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AdicionarUsuarioComponent } from '../adicionar-usuario/adicionar-usuario.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario.model';
import { AcessoService } from '../../../services/acesso.service';
import { Acesso } from '../../../models/Acesso.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [AdicionarUsuarioComponent, NgFor, NgIf],
  providers: [UsuarioService, AcessoService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  listaUsuarios: Usuario[] = [];
  acessos: { [key: number]: Acesso } = {};

  constructor(private usuarioService: UsuarioService, private acessoService: AcessoService) {
    this.atualizarListaUsuarios();
  }

  getKeys(obj: any): string[] {
    return ["Nome", "E-mail", "Data Registro", "Data Desligamento", "Acesso - Administrador", "Acesso - Medico Veterinario", "Acesso - Atendente", "Editar", "Desativar"];
  }

  atualizarListaUsuarios() {
    this.usuarioService.consultarUsuarios().subscribe({
      next: (data: Usuario[]) => {
        if (data) {
          this.listaUsuarios = data.filter(linha => linha.status !== "Inativo");
          this.listaUsuarios.forEach(usuario => {
            let dataCriacao = new Date(usuario.dataCriacao);
            let dia = String(dataCriacao.getDate()).padStart(2, '0');
            let mes = String(dataCriacao.getMonth() + 1).padStart(2, '0');
            let ano = dataCriacao.getFullYear();
            let horas = String(dataCriacao.getHours()).padStart(2, '0');
            let minutos = String(dataCriacao.getMinutes()).padStart(2, '0');
            usuario.dataCriacao = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

            let dataEncerramento = new Date(usuario.dataEncerramento);
            dia = String(dataEncerramento.getDate()).padStart(2, '0');
            mes = String(dataEncerramento.getMonth() + 1).padStart(2, '0');
            ano = dataEncerramento.getFullYear();
            horas = String(dataEncerramento.getHours()).padStart(2, '0');
            minutos = String(dataEncerramento.getMinutes()).padStart(2, '0');
            usuario.dataEncerramento = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

            this.consultarAcessos(usuario.idUsuario);
          });
        } else {
          console.log("Erro");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ", erro);
      }
    });
  }

  adicionarUsuario() {
    this.trocarComponenteFilho.emit("AdicionarUsuario");
  }

  atualizarUsuario(idUsuario: number) {
    localStorage.removeItem("idUsuario");
    localStorage.setItem("idUsuario", idUsuario.toString());
    this.trocarComponenteFilho.emit("AtualizarUsuario");
  }

  desligarUsuario(idUsuario: number) {
    this.usuarioService.desligarUsuario(idUsuario).subscribe({
      next: (data: Usuario[]) => {
        if (data) {
          this.atualizarListaUsuarios();
        } else {
          console.log("Erro ao desligar o usuario. Dados enviados, mas a operação não foi finalizada");
        }
      },
      error: (erro: any) => {
        console.log("Erro: ", erro);
      },
      complete: () => {
        console.log("Usuario desligado com sucesso");
        this.atualizarListaUsuarios();
      }
    });
  }

  consultarAcessos(idUsuario: number) {
    this.acessoService.consultarAcessoUsuario(idUsuario).subscribe({
      next: (data: Acesso) => {  
        if (data) {
          this.acessos[idUsuario] = data;          
        }  
        else{
          console.log("Erro ao buscar acesso");
        }   
      },
      error: (erro: any) => {
        console.log("Erro ao buscar acesso: ", erro);
      },
      complete: () => {
        console.log("Acesso buscado com sucesso");
      }
    });
  }
}
