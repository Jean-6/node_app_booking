FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

#Install the packages
RUN npm install

#Now we must expose the API running port to the outside world inorder to recieve requests.
EXPOSE 3000

CMD ["node", "server.js"]
#====> Images

#Creation d'image
#->docker build -t ocr-docker-build .

#Affichage des images presentes en local sur le pc
#->docker images -a

#Suppression des images presentes en local
#=>docker rmi IMAGE_ID
#docker rmi -f bf44f88d5762

#====> Conteneur

#Lancement du conteneur
#[option -d detacher le conteneur du process principal de la conole]
#[option -p definir l'utilisation du port ]
#->docker run -d -p 2368:2368 ocr-docker-build

#Arrêter le conteneur
#->docker stop CONTAINER_ID

#Suppression du conteneur Docker
#->docker rm ID_RETOURNÉ_LORS_DU_DOCKER_RUN

#Affichage des conteneurs actifs
#-> docker ps
#-> docker ps -a [ tous les afficher , ceux en cours d'execution et ceux qui ne le sont pas]

#Nettoyage du systeme , suppression
#(conteteneurs docker - reseaux crees par docker - images docker non-utilises - caches utilises pour la creation d'img)
#docker system prune