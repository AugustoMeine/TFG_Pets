package br.com.pets.services;

import br.com.pets.models.ListaClienteAnimal;
import br.com.pets.repositories.AnimalRepository;
import br.com.pets.repositories.ClienteRepository;
import br.com.pets.repositories.ListaClienteAnimalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ListaClienteAnimalService {

    Logger logger = Logger.getLogger(ListaClienteAnimalService.class.getName());
    private final ListaClienteAnimalRepository listaClienteAnimalRepository;
    private final AnimalRepository animalRepository;
    private final ClienteRepository clienteRepository;

    public ListaClienteAnimalService(ListaClienteAnimalRepository listaClienteAnimalRepository,AnimalRepository animalRepository,ClienteRepository clienteRepository){
        this.listaClienteAnimalRepository = listaClienteAnimalRepository;
        this.animalRepository = animalRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<ListaClienteAnimal> consultarListaClienteAnimals(){
        return(this.listaClienteAnimalRepository.findAll());
    }

    public ListaClienteAnimal consultarListaClienteAnimal(long idListaClienteAnimal){
        return(this.listaClienteAnimalRepository.findById(idListaClienteAnimal));
    }

    public ListaClienteAnimal salvarListaClienteAnimal(ListaClienteAnimal listaClienteAnimal){
        //Valida se já existe alguem com o id notificado
        if(this.listaClienteAnimalRepository.existsById(listaClienteAnimal.getIdListaClienteAnimal())){
            logger.warning("Erro ao salvar a ListaClienteAnimal: lista existente <" + listaClienteAnimal.getIdListaClienteAnimal() + ">");
            return(null);
        }
        //Valida se já existe o Animal notificado
        if(!this.animalRepository.existsById(listaClienteAnimal.getIdAnimal())){
            logger.warning("Erro ao salvar a ListaClienteAnimal: animal nao localizado <" + listaClienteAnimal.getIdAnimal() + ">");
            return(null);
        }
        //Valida se já existe o Cliente notificado
        if(!this.clienteRepository.existsById(listaClienteAnimal.getIdCliente())){
            logger.warning("Erro ao salvar a ListaClienteAnimal: cliente nao localizado <" + listaClienteAnimal.getIdCliente() + ">");
            return(null);
        }

        //Id do listaClienteAnimal, por ser forma sequencial é desconsiderado o valor enviado
        listaClienteAnimal.setIdListaClienteAnimal(-1L);
        listaClienteAnimal.setDataCriacao(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")),DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")));

        return(this.listaClienteAnimalRepository.save(listaClienteAnimal));
    }

    public ListaClienteAnimal alterarListaClienteAnimal(ListaClienteAnimal listaClienteAnimal){
        //Valida se existe o ID para ser atualizado
        if(!this.listaClienteAnimalRepository.existsById(listaClienteAnimal.getIdListaClienteAnimal())){
            return(null);
        }
        //Valida se já existe o Animal notificado
        if(!this.animalRepository.existsById(listaClienteAnimal.getIdAnimal())){
            logger.warning("Erro ao atualizar a ListaClienteAnimal: animal nao localizado <" + listaClienteAnimal.getIdAnimal() + ">");
            return(null);
        }
        //Valida se já existe o Cliente notificado
        if(!this.clienteRepository.existsById(listaClienteAnimal.getIdCliente())){
            logger.warning("Erro ao atualizar a ListaClienteAnimal: cliente nao localizado <" + listaClienteAnimal.getIdCliente() + ">");
            return(null);
        }

        ListaClienteAnimal listaClienteAnimalFinal = this.listaClienteAnimalRepository.findById(listaClienteAnimal.getIdListaClienteAnimal());

        //Separa apenas os campos que podem ser alterados
        listaClienteAnimalFinal.setIdAnimal(listaClienteAnimal.getIdAnimal());
        listaClienteAnimalFinal.setIdCliente(listaClienteAnimal.getIdCliente());

        return(this.listaClienteAnimalRepository.save(listaClienteAnimalFinal));
    }

}
