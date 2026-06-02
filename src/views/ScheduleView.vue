<script setup>
import {ref} from 'vue'
import CalendarPicker from "@/components/CalendarPicker.vue";
const choise_variable = ref('')
const timetabletype = ref('')
const timetableduration = ref('')
const id_whom = 27
const mas_group = ref([])
const mas_room = ref([])
const mas_teacherstaff = ref([])
timetable()
teacherstaff()
group_list()
room_list()
async function vKid(){
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
    
    
  } catch (error) {
    console.error("Ошибка в загрузке списка преподавателей:", error);
  }
}
//Сделать автоматический рендер расписания при вводе всех значений в select
async function timetable() {
  try{
    const result = await fetch(`https://api3.rb.asu.ru/api/v1/timetable/${timetabletype}/${timetableduration}/27/2026-06-01T08:40:58.882Z`)
    const qweresult = await result.json()
    console.log(qweresult.value[0].timeTable)
    for(let i = 0; i< 8;i++){
      console.log(qweresult.value[0].timeTable[i].lessonNumber)
    }
  } catch(error){
    console.log("Лошара")
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
    <select v-model="timetableduration">
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
  <button @click="timetable" style="width: 100px;height: 50px;"></button>
  <table>
    <tr>
      <td v-for="elemas in source"></td>
    </tr>
  </table>
  </div>


</template>

<style module>
.calendar {
  margin: 50px 0;
}
</style>