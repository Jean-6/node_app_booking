FROM node:16.3.0-alpine


WORKDIR /usr/src/app

#Copy all files to the image
COPY . .

#Install the packages
RUN npm install

#Now we must expose the API running port to the outside world inorder to recieve requests.
EXPOSE 3000


CMD ["npm", "run", "start"]



#Creation d'image
#->docker build -t ocr-docker-build .

#Lancement du conteneur
#[option -d detacher le conteneur du process principal de la conole]
#[option -p definir l'utilisation du port ]
#->docker run -d -p 2368:2368 ocr-docker-build

#Affichage des conteneurs actifs
#-> docker ps

#Arrêter le conteneur
#->docker stop CONTAINER_ID

#Suppression du conteneur Docker
#->docker rm ID_RETOURNÉ_LORS_DU_DOCKER_RUN

#Affichage des images presentes en local sur le pc
#->docker images -a

#Nettoyage du systeme , suppression
#(conteteneurs docker - reseaux crees par docker - images docker non-utilises - caches utilises pour la creation d'img)
#docker system prune