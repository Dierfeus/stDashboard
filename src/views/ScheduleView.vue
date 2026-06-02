<template>
  <div class="page">
    <!--<input v-model="choise_variable" />-->
    <select v-model="timetabletype">
      <option id="group" value="group">Группа</option>
      <option id="room" value="room">Аудитория</option>
      <option id="teacher" value="teacher">Преподаватель</option>
    </select>
    <select name="" id="timetableduration">
      <option value="day" id="day">День</option>
      <option value="week" id="week">Неделя</option>
      <option value="teacher" id="teacher">Месяц</option>
    </select>
    <select v-if="timetabletype == `group`">

    </select>
    <button @click="vKid" style="width:100px ; height: 20px;">Вывезти</button>
    <button @click="group_list" style="width:100px ; height: 20px;">group_list</button>
    <div class="calendar">
      <CalendarPicker @select="handleDate"/>
    </div>


  </div>
</template>

<script setup>
import {ref} from 'vue'
import BottomNav from '../components/BottomNav.vue'
import CalendarPicker from "@/components/CalendarPicker.vue";
const choise_variable = ref('')
const timetabletype = ref('')
const id_whom = 27

function handleDate(date) {
  console.log('Выбрана дата:', date)
}

async function vKid(){
  const timetableduration = document.getElementById("timetableduration").value
  console.log(timetabletype)
  console.log(timetableduration)
  try {
    const response_vkid = await fetch(`https://api3.rb.asu.ru/api/v1/timetable/${timetabletype}/${timetableduration}/27`);
    const subject_vkid = await response_vkid.json();
    console.log(subject_vkid.value[0]); 
  } catch (error) {
    console.error("Ошибка при загрузке расписания:", error);
  }
}
//const subject = fetch('https://api3.rb.asu.ru/api/v1/timetable/room/day/27')
//console.log(subject)


async function group_list() {
  try {
    const response_group_list = fetch("/api/timetable/helperselect?type=3")
    const subject_group_list = (await response_group_list)
    console.log(subject_group_list)
  } catch (error) {
    console.log("Ошибк в загрузке списка групп", error)
  }
}



</script>

<style>
.calendar {
  margin: 50px 0;
}
</style>