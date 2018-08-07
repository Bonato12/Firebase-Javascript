//Inicializamos nuestro proyecto de firebase
firebase.initializeApp({
  apiKey: "AIzaSyAZZZYNcR0nwdM0hTKcTrAuXD8xN1iql80",
  authDomain: "crud-f5421.firebaseapp.com",
  projectId: "crud-f5421"
});

//inicializamos la bd de Firestone
var db = firebase.firestore();

// Funcion para guardar un nuevo Usuario
function guardar(){
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;

  db.collection("users").add({
      first: nombre,
      last:  apellido,
      born: fecha
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      //Una vez guardado los datos inicializamos en vacio los inputs
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('fecha').value = '';
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

//Mostramos los datos guardados en Firebase en una Tabla
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `<tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
          </tr>`
    });
});

//Eliminamos un Usuario de Firebase
function eliminar(id){
  db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}



//Editamos un usuario de Firebase
function editar(id,nombre,apellido,fecha){

document.getElementById('nombre').value = nombre;
document.getElementById('apellido').value = apellido;
document.getElementById('fecha').value = fecha;

var boton = document.getElementById('boton');
boton.innerHTML = 'Editar';

//Creamos una funcion anonima
boton.onclick = function(){

  //hace referencia al nodo y al id que queremos editar
  var userRef = db.collection("users").doc(id);

  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;

    return userRef.update({
      first: nombre,
      last:  apellido,
      born: fecha
    })
    .then(function() {
        console.log("Document successfully updated!");
        //Si se edita correctante el boton cambia a Guardar y los inputs se inicializan en vacio
        boton.innerHTML = 'Guardar';
        boton.onclick = guardar;
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });


}


}
