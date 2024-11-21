package br.com.pets.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import br.com.pets.models.Animal;
import br.com.pets.repositories.AnimalRepository;

@Service
public class AnimalService {

    Logger logger = Logger.getLogger(AnimalService.class.getName());
    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository){
        this.animalRepository = animalRepository;
    }

    public List<Animal> consultarAnimals(){
        return(this.animalRepository.findAll());
    }

    public Animal consultarAnimal(long idAnimal){
        return(this.animalRepository.findById(idAnimal));
    }

    public Animal salvarAnimal(Animal animal){
        //Valida se já existe alguem com o usuário notificado
        if(this.animalRepository.existsById(animal.getIdAnimal())){
            return(null);
        }

        //Referente ao Id do animal, por ser forma sequencial é desconsiderado o valor enviado
        animal.setIdAnimal(-1L);
        animal.setStatus("Ativo");

        return(this.animalRepository.save(animal));
    }

    public Animal alterarAnimal(Animal animal){
        if(!this.animalRepository.existsById(animal.getIdAnimal())){
            return(null);
        }

        Animal animalFinal = this.animalRepository.findById(animal.getIdAnimal());

        //Separa apenas os campos que podem ser alterados
        animalFinal.setNome(animal.getNome());
        animalFinal.setPeso(animal.getPeso());
        animalFinal.setRaca(animal.getRaca());
        animalFinal.setIdade(animal.getIdade());
        animalFinal.setSexo(animal.getSexo());

        return(this.animalRepository.save(animalFinal));
    }

    public Animal desligarAnimal(long idAnimal){
        //valida se o usuário existe
        if(!this.animalRepository.existsById(idAnimal)){
            logger.warning("Desligamento nao efetivado: Animal nao localizado");
            return(null);
        }

        Animal animalFinal = this.animalRepository.findById(idAnimal);

        animalFinal.setStatus("Inativo");

        return(this.animalRepository.save(animalFinal));
    }

    public Animal ativarAnimal(long idAnimal){
        //valida se o usuário existe
        if(!this.animalRepository.existsById(idAnimal)){
            return(null);
        }

        Animal animalFinal = this.animalRepository.findById(idAnimal);

        //Valida se o usuário já foi desligado
        if(!animalFinal.getStatus().equals("Inativo")){
            logger.warning("Ativacao nao efetivada: Status 'Inativo' nao localizado");
        }

        animalFinal.setStatus("Ativo");

        return(this.animalRepository.save(animalFinal));
    }

}
