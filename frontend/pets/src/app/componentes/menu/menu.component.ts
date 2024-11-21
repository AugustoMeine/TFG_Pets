import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Funcionalidade } from '../../models/Funcionalidade.model';
import { ClienteComponent } from '../cliente/cliente/cliente.component';
import { AdicionarClienteComponent} from '../cliente/adicionar-cliente/adicionar-cliente.component';
import { AtualizarClienteComponent } from '../cliente/atualizar-cliente/atualizar-cliente.component';
import { AnimalComponent } from '../animal/animal/animal.component';
import { AdicionarAnimalComponent } from '../animal/adicionar-animal/adicionar-animal.component';
import { AtualizarAnimalComponent } from '../animal/atualizar-animal/atualizar-animal.component';
import { MedicamentoComponent } from '../medicamento/medicamento/medicamento.component';
import { AdicionarMedicamentoComponent } from '../medicamento/adicionar-medicamento/adicionar-medicamento.component';
import { AtualizarMedicamentoComponent } from '../medicamento/atualizar-medicamento/atualizar-medicamento.component';
import { AdicionarProntuarioComponent } from '../prontuario/adicionar-prontuario/adicionar-prontuario.component';
import { AtualizarProntuarioComponent } from '../prontuario/atualizar-prontuario/atualizar-prontuario.component';
import { UsuarioComponent } from '../usuario/usuario/usuario.component';
import { AdicionarUsuarioComponent } from '../usuario/adicionar-usuario/adicionar-usuario.component';
import { AtualizarUsuarioComponent } from '../usuario/atualizar-usuario/atualizar-usuario.component';
import { ProntuarioComponent } from '../prontuario/prontuario/prontuario.component';
import { AgendamentoComponent } from '../agendamento/agendamento/agendamento.component';
import { AdicionarAgendamentoComponent } from '../agendamento/adicionar-agendamento/adicionar-agendamento.component';
import { AcessoService } from '../../services/acesso.service';
import { Acesso } from '../../models/Acesso.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,NgFor,
    ClienteComponent,AdicionarClienteComponent,AtualizarClienteComponent,
    AnimalComponent,AdicionarAnimalComponent,AtualizarAnimalComponent,
    MedicamentoComponent,AdicionarMedicamentoComponent,AtualizarMedicamentoComponent,
    ProntuarioComponent,AdicionarProntuarioComponent,AtualizarProntuarioComponent,
    UsuarioComponent,AdicionarUsuarioComponent,AtualizarUsuarioComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @ViewChild('conteudo', { read: ViewContainerRef }) conteudo!: ViewContainerRef;

  listaFuncionalidades: Funcionalidade[];  
  letrasNome: string = "-";
  menuUsuarioAberto: boolean = false;
  hover: boolean = false;
  acessoUsuario: Acesso;

  constructor(private router: Router, private acessoService: AcessoService) { 
    this.acessoUsuario = new Acesso(0,0,"Nao","Nao","Nao");
    this.listaFuncionalidades = [];
    
    this.carregarFuncionalidades();    

    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.nome) {
      let nomeLocalizado = user.nome.split(' ');
      if (nomeLocalizado.length > 1) {
        this.letrasNome = nomeLocalizado[0][0] + nomeLocalizado[nomeLocalizado.length - 1][0];
      } else {
        this.letrasNome = nomeLocalizado[0][0];
      }
    }
    
  }

  deslogar(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  carregarFuncionalidades(){
    this.acessoService.consultarAcessoUsuario(JSON.parse(localStorage.getItem('user') || '{}').id).subscribe(
      {
        next:(data: Acesso)=>{
          if(data){
            this.acessoUsuario = data;
          }else{
            console.log("Os dados do acesso do acesso foram enviados, mas não foram retornados.");
          }                  
        },
        error:(erro: any)=>{
          console.log("Falha ao consultar os acessos: ");
          console.log(erro);
          this.deslogar();
        },
        complete:()=>{          
          if(this.acessoUsuario.acessoAtendente === "Sim"){
            console.log("Acesso de atendente");
            this.listaFuncionalidades.push({"nome":"Cliente","logo":"svg/pessoa.svg"});
            this.listaFuncionalidades.push({"nome":"Animal","logo":"svg/pataAnimal.svg"});            
          }
          if(this.acessoUsuario.acessoMedicoVeterinario === "Sim"){
            console.log("Acesso de médico veterinário");
            this.listaFuncionalidades.push({"nome":"Prontuário","logo":"svg/formulario.svg"});
            this.listaFuncionalidades.push({"nome":"Agendamento","logo":"svg/calendario.svg"});
          }          
          if(this.acessoUsuario.acessoAdministrador === "Sim"){
            console.log("Acesso de administrador");
            this.listaFuncionalidades.push({"nome":"Medicamento","logo":"svg/medicamento.svg"});
            this.listaFuncionalidades.push({"nome":"Usuario","logo":"svg/usuario.svg"});            
          }
          this.trocarComponente("Cliente");
        }
      }
    );
  }

  trocarComponente(textoEntrada:string){   

    if(textoEntrada === "Cliente"){
      if(this.acessoUsuario.acessoAtendente === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(ClienteComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }

    if(textoEntrada === "AdicionarCliente"){
      if(this.acessoUsuario.acessoAtendente === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AdicionarClienteComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }     

    if(textoEntrada === "AtualizarCliente"){
      if(this.acessoUsuario.acessoAtendente === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AtualizarClienteComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    } 

    if(textoEntrada === "Animal"){
      if(this.acessoUsuario.acessoAtendente === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AnimalComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }
    
    if(textoEntrada === "AdicionarAnimal"){
      if(this.acessoUsuario.acessoAtendente === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AdicionarAnimalComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }     
    
    if(textoEntrada === "AtualizarAnimal"){
      if(this.acessoUsuario.acessoAtendente === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AtualizarAnimalComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    } 
    
    if(textoEntrada === "Medicamento"){
      if(this.acessoUsuario.acessoAdministrador === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(MedicamentoComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }

    if(textoEntrada === "AdicionarMedicamento"){
      if(this.acessoUsuario.acessoAdministrador === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AdicionarMedicamentoComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }     

    if(textoEntrada === "AtualizarMedicamento"){
      if(this.acessoUsuario.acessoAdministrador === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AtualizarMedicamentoComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    } 
    
    if(textoEntrada === "Prontuário"){
      if(this.acessoUsuario.acessoMedicoVeterinario === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(ProntuarioComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }
    
    if(textoEntrada === "AdicionarProntuario"){
      if(this.acessoUsuario.acessoMedicoVeterinario === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AdicionarProntuarioComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }     
    
    if(textoEntrada === "AtualizarProntuario"){
      if(this.acessoUsuario.acessoMedicoVeterinario === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AtualizarProntuarioComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    } 
    
    if(textoEntrada === "Usuario"){
      if(this.acessoUsuario.acessoAdministrador === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(UsuarioComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }
    
    if(textoEntrada === "AdicionarUsuario"){
      if(this.acessoUsuario.acessoAdministrador === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AdicionarUsuarioComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }     

    if(textoEntrada === "AtualizarUsuario"){
      if(this.acessoUsuario.acessoAdministrador === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AtualizarUsuarioComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    } 

    if(textoEntrada === "Agendamento"){
      if(this.acessoUsuario.acessoMedicoVeterinario === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AgendamentoComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }    
    if(textoEntrada === "AdicionarAgendamento"){
      if(this.acessoUsuario.acessoMedicoVeterinario === "Nao"){
        console.log("Acesso negado");
        return;
      }
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(AdicionarAgendamentoComponent); 
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }       
    
  }

  direcionarParaOMenu(){    
    this.trocarComponente("Cliente");
  }

}
