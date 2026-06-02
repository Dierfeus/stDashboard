<script setup>
import {ref} from 'vue'
import BottomNav from '../components/BottomNav.vue'
import CalendarPicker from "@/components/CalendarPicker.vue";
const choise_variable = ref('')
const timetabletype = ref('')
const id_whom = 27
const mas_group = ref([])
const mas_room = ref([])
const mas_teacherstaff = ref([])
teacherstaff()
group_list()
room_list()
async function vKid(){
  const timetableduration = document.getElementById("timetableduration").value
  console.log(timetabletype)
  console.log(timetableduration)
  try {
    const response = await fetch(`https://api3.rb.asu.ru/api/v1/timetable/${timetabletype}/${timetableduration}/27`);
    const subject_vkid = await response.json();
    console.log(subject_vkid.value[0]); 
  } catch (error) {
    console.error("Ошибка при загрузке расписания:", error);
  }
}
//const subject = fetch('https://api3.rb.asu.ru/api/v1/timetable/room/day/27')
//console.log(subject)


function handleDate(date) {
  console.log('Выбрана дата:', date)
}

async function group_list() {
    try {
    const response = await fetch("https://api3.rb.asu.ru/api/v1/catalog/groups")
    const something = await response.json()
    
  
    if (something && something.value) {
      mas_group.value = something.value.map(item => item.name)
    }
    
    console.log(mas_group.value) 
  } catch (error) {
    console.error("Ошибка в загрузке списка групп", error)
  }
}
async function room_list() {
    try {
    const response = await fetch("https://api3.rb.asu.ru/api/v1/auditorium/auditorium")
    const something = await response.json()
    
  
    if (something && something.value) {
      mas_room.value = something.value.map(item => item.title)
    }
    
    console.log(mas_room.value) 
  } catch (error) {
    console.error("Ошибка в загрузке списка групп", error)
  }
}
async function teacherstaff() {
  try {
    const response = await fetch("https://api3.rb.asu.ru/api/v1/teachingstaff/teachers");
    const something = await response.json();
    
    if (something && Array.isArray(something.value)) {
      mas_teacherstaff.value = something.value.map(teacher => 
        `${teacher.lastname} ${teacher.firstname} ${teacher.patronymic}`
      );
    }
    
    console.log(mas_teacherstaff.value); 
    
  } catch (error) {
    console.error("Ошибка в загрузке списка преподавателей:", error);
  }
}

</script>

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
   <select  v-if="timetabletype === 'group'">
  <option  v-for="item_mas_group in mas_group">{{ item_mas_group }}</option>
  </select>
  <select v-if="timetabletype == 'room'">
    <option v-for="item_mas_room in mas_room">{{ item_mas_room }}</option>

  </select>
  <select v-if="timetabletype == 'teacher'">
    <option v-for="item_mas_teacherstaff in mas_teacherstaff">{{ item_mas_teacherstaff }}</option>

  </select>
  <div class="calendar">
    <CalendarPicker @select="handleDate" />
  </div>

  </div>
</template>

<style module>
.calendar {
  margin: 50px 0;
}
</style>