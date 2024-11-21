import { Component, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { NgFor } from '@angular/common';
import { Usuario } from '../../../models/Usuario.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AcessoService } from '../../../services/acesso.service';
import { Acesso } from '../../../models/Acesso.model';

@Component({
  selector: 'app-adicionar-usuario',
  standalone: true,
  imports: [NgFor, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [UsuarioService, AcessoService, provideNgxMask()],
  templateUrl: './adicionar-usuario.component.html',
  styleUrl: './adicionar-usuario.component.css'
})
export class AdicionarUsuarioComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();
  
  usuarioDadosTela: Usuario;
  acessoDadosTela: Acesso;

  constructor(private usuarioService: UsuarioService, private acessoService: AcessoService){  
    this.usuarioDadosTela = new Usuario(0, "", "", "", "", "", "Ativo");
    this.acessoDadosTela = new Acesso(0, 0, "", "", "");
  }

  ngOnInit(): void {    
  }

  adicionarUsuario(){    
    this.usuarioService.salvarUsuario(this.usuarioDadosTela).subscribe(
      {
        next: (data: Usuario) => {
          if(data){
            this.acessoDadosTela.idUsuario = data.idUsuario;
            this.acessoService.salvarAcesso(this.acessoDadosTela).subscribe({
              next: (acessoData: Acesso) => {
                if(acessoData){
                  this.retornarTelaUsuario();
                } else {
                  console.log("Erro: dados de acesso enviados, mas a operação não foi finalizada");
                }
              },
              error: (erro: any) => {
                console.log("Erro ao salvar acesso: ", erro);
              },
              complete: () => {
                console.log("Acesso adicionado com sucesso");
              }
            });
          } else {
            console.log("Erro: dados enviados, mas a operação não foi finalizada");
          }                  
        },
        error: (erro: any) => {
          console.log("Erro: ");
          console.log(erro);
        },
        complete: () => {
          console.log("Usuario adicionado com sucesso");          
        }
      }
    );
  }

  retornarTelaUsuario(){
    this.trocarComponenteFilho.emit("Usuario");
  }
}
