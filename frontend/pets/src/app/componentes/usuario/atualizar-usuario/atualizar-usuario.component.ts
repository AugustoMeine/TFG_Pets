import { Component, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { NgFor } from '@angular/common';
import { Usuario } from '../../../models/Usuario.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AcessoService } from '../../../services/acesso.service';
import { Acesso } from '../../../models/Acesso.model';

@Component({
  selector: 'app-atualizar-usuario',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [UsuarioService, AcessoService, provideNgxMask()],
  templateUrl: './atualizar-usuario.component.html',
  styleUrl: './atualizar-usuario.component.css'
})
export class AtualizarUsuarioComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  
  usuarioDadosTela: Usuario;
  acessoDadosTela: Acesso;

  constructor(private usuarioService: UsuarioService, private acessoService: AcessoService){  
    this.usuarioDadosTela = new Usuario(0, "", "", "", "", "", "Ativo");
    this.acessoDadosTela = new Acesso(0, 0, "", "", "");
    this.carregarDados();
  }

  ngOnInit():void {       
  }

  ngAfterViewInit(): void {    
  }

  carregarDados(){
    if((localStorage.getItem("idUsuario") == null) || (localStorage.getItem("idUsuario") == "") || (localStorage.getItem("idUsuario")) ){      
      this.trocarComponenteFilho.emit("Usuario");
    }

    let idUsuario = Number(localStorage.getItem("idUsuario"));
    console.log(localStorage.getItem("idUsuario"))
    if (isNaN(idUsuario) || idUsuario <= 0) {
      this.trocarComponenteFilho.emit("Usuario");
    }

    this.usuarioService.consultarUsuario(idUsuario).subscribe(
      {
        next:(data: Usuario)=>{
          if(data){
            this.usuarioDadosTela = data;
            this.acessoService.consultarAcessoUsuario(idUsuario).subscribe({
              next: (acesso: Acesso) => {
                this.acessoDadosTela = acesso;
              },
              error: (erro: any) => {
                console.log("Erro ao buscar acesso: ", erro);
              }
            });
          }else{
            console.log("Erro. Dados enviados, mas a operação não foi finalizada - Usuario");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Consulta de usuario concluída");
        }
      }
    );
  }

  atualizarUsuario(){
    this.usuarioService.atualizarUsuario(this.usuarioDadosTela).subscribe(
      {
        next:(data: Usuario)=>{
          if(data){
            this.acessoService.atualizarAcesso(this.acessoDadosTela).subscribe({
              next: (acessoData: Acesso) => {
                if(acessoData){
                  console.log("Usuario e acesso atualizados com sucesso");
                  this.retornarTelaUsuario();
                } else {
                  console.log("Erro: dados de acesso enviados, mas a operação não foi finalizada");
                }
              },
              error: (erro: any) => {
                console.log("Erro ao atualizar acesso: ", erro);
              },
              complete: () => {
                console.log("Acesso atualizado com sucesso");
              }
            });
          }else{
            console.log("Erro: dados enviados, mas a operação não foi finalizada - Usuario");
          }                  
        },
        error:(erro: any)=>{
          console.log("Erro - Usuario: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Atualização de usuario concluída");    
          this.trocarComponenteFilho.emit("Usuario");            
        }
      }
    );
  }

  retornarTelaUsuario(){
    this.trocarComponenteFilho.emit("Usuario");
  }
}
