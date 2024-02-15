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

import { ref } from "vue";

let actividad = ref("")
let fecha = ref("")
let prioridad = ref("")
const Prioridadd = prioridad.value==true ? "Alta":"Baja"

let actividades = ref([]);

function eliminar(i){
  actividades.value.splice(i,1)
}


function ordenar(){
  actividades.value.sort((a,b)=>a.Prioridadd.localeCompare(b.Prioridadd))
}

function guardar() {

  const Prioridadd = prioridad.value==true ? "Alta":"Baja"
  actividades.value.push({
    Actividad: actividad.value,
    Fecha: fecha.value,
    Prioridadd
  });
}

</script>


<style scoped>

.padre {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }

  .parte1, .parte2 {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  input[type="text"],
  input[type="date"],
  button,
  input[type="checkbox"] {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input[type="checkbox"] {
    margin-top: 5px;
  }

  button {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tbody tr:hover {
    background-color: #141313;
  }



</style>