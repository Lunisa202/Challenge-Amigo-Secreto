let listFriendsStored = [];
const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

function validarNombre(nombre) {
  return regex.test(nombre);
}
function showOverlay(messageToUser, type) {
//background
 // Crear el fondo que cubre toda la pantalla
 let background = document.createElement("div");
 background.id = "overlayBackground";
 background.style.position = "fixed";
 background.style.top = "0";
 background.style.left = "0";
 background.style.width = "100vw";
 background.style.height = "100vh";
 background.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
 background.style.zIndex = "999";
 background.onclick = function () {
     document.body.removeChild(overlay);
     document.body.removeChild(background);
 };


  // Crear el contenedor del overlay
  let overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "50%";
  overlay.style.left = "50%";
  overlay.style.width = "50%";
  overlay.style.height = "20%";
  overlay.style.transform = "translate(-50%, -50%)";
  overlay.style.backgroundColor = type == "success" ? "#bbc4f0" : "#FFCCCC ";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
 overlay.style.padding='10px';
  overlay.style.borderRadius = "10px";
  overlay.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  overlay.style.textAlign = "center";
  overlay.style.zIndex = "1000";

  // Crear el mensaje
  let message = document.createElement("p");
  message.innerText = messageToUser;
  message.style.fontSize = "20px";
  message.style.fontFamily = "Inter";
  // Crear el botón de cerrar "X"
  let closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.style.display = "flex";
  closeButton.style.justifyContent = "center";
  closeButton.style.alignItems = "center";
  closeButton.style.position = "absolute";
  closeButton.style.top = "5px";
  closeButton.style.right = "5px";
  closeButton.style.border = "none";
  closeButton.style.background = type == "success" ? "#4B69FD" : "red";
  closeButton.style.color = "white";
  closeButton.style.cursor = "pointer";
  closeButton.style.borderRadius = "10px";
  closeButton.style.width = "30px";
  closeButton.style.height = "30px";
  closeButton.onclick = function () {
    document.body.removeChild(overlay);
    document.body.removeChild(background);
};

 
  // Agregar elementos
  overlay.appendChild(closeButton);
  overlay.appendChild(message);
  document.body.appendChild(background);
  document.body.appendChild(overlay);
}

function addFriend() {
  let friend = document.querySelector("#amigo").value;
  console.log(friend);
  if (validarNombre(friend) && friend.length > 3) {
    // agregar nombre a la lista de nombres
    let isAdded = checkFriendNotDuplicated(friend);
    if (isAdded) {
      addList(friend);
    }
    //limpiar input
    document.querySelector("#amigo").value = "";
    //agregar amigo al HTML
    showFriends();
  } else {
    // mostrar overlay con errores
    showOverlay(
      "El nombre escrito no es válido: no usar caracteres no permitidos, no dejar el campo vacío",
      "error"
    );
  }
}
function checkFriendNotDuplicated(nameFriend) {
  if (listFriendsStored.includes(nameFriend)) {
    showOverlay("Ya añadiste a un amigo con ese nombre, intenta con otro");
    return false;
  } else {
    showOverlay("Amigo agregado correctamente", "success");
    return true;
  }
}
function addList(friend) {
  listFriendsStored.push(friend);
}
const showFriends = () => {
  let list = document.getElementById("listaAmigos");
  list.innerHTML = "";

  listFriendsStored.forEach((value) => {
    let li = document.createElement("li");
    li.textContent = value;
    li.style.color = "#4B69FD";
    li.style.padding = "15px";
    li.style.fontSize = "1.3rem";
    li.style.fontWeight = "bold";
    li.style.border = "dotted 2px #4B69FD";
    li.style.marginTop = "10px";
    li.style.borderRadius = "20px";
    list.appendChild(li);
  });
};
const showChosenFriend = (value) => {
let list = document.getElementById("listaAmigos");
  list.innerHTML = "";
  let result = document.getElementById("resultado");
  result.innerHTML = "";
  let li = document.createElement("li");
  li.textContent = "El amigo secreto será: "+value;
  li.style.color = "#fe652b";
  li.style.padding = "15px";
  li.style.fontSize = "1.3rem";
  li.style.fontWeight = "bold";
  li.style.border = "dotted 2px #fe652b";
  li.style.marginTop = "10px";
  li.style.borderRadius = "20px";
  result.appendChild(li);
};

function drawAFriend() {
  if (listFriendsStored.length == 0) {
    showOverlay(
      "No tienes amigos agregados aun, agrega y vuelve a intentarlo",
      "error"
    );
  } else {
    //sorteo inicia
    const index = numberRamdon(0, listFriendsStored.length - 1);
    const chosenFriend = listFriendsStored[index];
    showChosenFriend(chosenFriend);
  }
}
function numberRamdon(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function reload(){
let list = document.getElementById("listaAmigos");
  list.innerHTML = "";
  let result = document.getElementById("resultado");
  result.innerHTML = "";
 listFriendsStored = [];

}
