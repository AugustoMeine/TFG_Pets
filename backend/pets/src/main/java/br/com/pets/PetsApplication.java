package br.com.pets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetsApplication {
	//Para buildar, executar o comando: mvn clean package
	/*	
	Transformar o http para https: keytool -genkeypair -alias my-ssl-cert -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore keystore.p12 -validity 3650 -dname "CN=localhost, OU=ServidorPets, O=ServidorPets, L=ServidorPets, ST=ServidorPets, C=sp"
	
	Para adicionar o certificado nos certificados confiáveis: keytool -exportcert -alias my-ssl-cert -keystore keystore.p12 -file my-ssl-cert.crt -rfc -storetype PKCS12
	
	No linux:
	1- sudo cp my-ssl-cert.crt /usr/local/share/ca-certificates/
	2 - sudo update-ca-certificates

	No windows:
	1- Double click no arquivo my-ssl-cert.crt e instalar no "Autoridades de Certificação Raiz Confiáveis"
	2- Depois validar ao pressionar "Win + R", e digitar certmgr.msc.
	3- Navegue até "Autoridades de Certificação Raiz Confiáveis" > "Certificados" e verificar se o certificado foi instalado	
	*/
	
	public static void main(String[] args) {
		SpringApplication.run(PetsApplication.class, args);
	}

}
