<template>
  <div class="padre">

    <section class="parte1">
      <input type="text" placeholder="Ingresa la actividad..." v-model="actividad">
      <input type="date" v-model="fecha">
    </section>

    <section class="parte2">
      <button @click="guardar()">Agregar</button>
      <input type="checkbox" name="prioridad" value="Alta" v-model="prioridad">Alta
      <button @click="ordenar()">Organizar</button>
    </section>

    <table>
      <thead>
        <tr>
          <th>Actividad</th>
          <th>Fecha</th>
          <th>Prioridad</th>
          <th>Opciones</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in actividades" :key="i" :style="item.Prioridadd ==='Alta'?{backgroundColor:'Red',color:'white'}:''">
          <td>{{ item.Actividad }}</td>
          <td>{{ item.Fecha }}</td>
          <td>{{ item.Prioridadd }}</td>
          <td>
            <button @click="eliminar(i)">❌</button>
          </td>
        </tr>

      </tbody>

    </table>
  </div>
</template>


<script setup>
import Swal from "sweetalert2";

import { ref } from "vue";

let actividad = ref("")
let fecha = ref("")
let prioridad = ref("")
const Prioridadd = prioridad.value==true ? "Alta":"Baja"
let fsDate;
let hoy = new Date()
hoy.setHours

let actividades = ref([]);

function eliminar(i){
  actividades.value.splice(i,1)
}


function ordenar(){
  actividades.value.sort((a,b)=>a.Prioridadd.localeCompare(b.Prioridadd))
}

function guardar() {
  fsDate=new Date (fecha.value+"T00:00:00")
  if (actividad.value === "" || fecha.value === "") {
    Swal.fire({
      text: "Por favor, completa todos los campos.",
      icon: "warning",
    });
    return;
  }else if (fsDate<hoy){
    Swal.fire({
      text: "Ingrese una fecha válida.",
      icon: "warning",
    });
  }else{
    const Prioridadd = prioridad.value==true ? "Alta":"Baja"
    actividades.value.push({
      Actividad: actividad.value,
      Fecha: fecha.value,
      Prioridadd
    });
  }
}

</script>


<style scoped>
.padre {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
}

.parte1, .parte2 {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

input[type="text"],
input[type="date"],
button,
input[type="checkbox"] {
  padding: 20px;
  font-size: 22px;
  border: 3px solid #ccc;
  border-radius: 10px;
}

input[type="checkbox"] {
  margin-top: 15px;
}

button {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 22px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}

th, td {
  border: 3px solid #ddd;
  padding: 24px;
  text-align: left;
  font-size: 20px;
}

th {
  background-color: #4caf50;
  color: white;
}

tbody tr:hover {
  background-color: #141313;
}
</style>
