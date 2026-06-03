<script setup>
import {onMounted, ref, watch} from 'vue'
import CalendarPicker from "@/components/CalendarPicker.vue";
const choise_variable = ref('')
const timetabletype = ref('')
const timetableduration = ref('')
const id_whom = 27
const mas_group = ref([])
const mas_room = ref([])
const mas_teacherstaff = ref([])
let qweresult = ref([])
const selectedId = ref(27)
const dates = ref('')
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
  dates.value = date
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
function formatTimeRange(startTime, endTime) {
  if (!startTime || !endTime) return '—'
  
  const start = startTime.split('T')[1]?.slice(0, 5) || startTime
  const end = endTime.split('T')[1]?.slice(0, 5) || endTime
  
  return `${start} - ${end}`
}

async function timetable() {
  try {
    const type = timetabletype.value
    const duration = timetableduration.value
    const id = selectedId.value
  
    if (!type || !duration) {
      console.log("Выберите все параметры")
      return
    }
    
    const url = `https://api3.rb.asu.ru/api/v1/timetable/${type}/${duration}/${id}`
    console.log(fetch('https://api3.rb.asu.ru/api/v1/timetable/group/day/27'))
    const response = await fetch(url)
    const data = await response.json()
    qweresult.value = data
    
    console.log("Расписание загружено:", data)
    
  } catch(error) {
    console.error("Ошибка:", error)
  }

}

if (timetabletype && timetableduration && dates) {
  timetable()
}

</script>

<template>
  <div class="page">
    <!--<input v-model="choise_variable" />-->
    <select @input="timetable" v-model="timetabletype">
      <option id="group" value="group">Группа</option>
      <option id="room" value="room">Аудитория</option>
      <option id="teacher" value="teacher">Преподаватель</option>
    </select>
    <select @input="timetable" v-model="timetableduration">
      <option value="day" id="day">День</option>
      <option value="week" id="week">Неделя</option>
      <option value="teacher" id="teacher">Месяц</option>
    </select>
   <select @input="timetable"  v-if="timetabletype === 'group'">
  <option  v-for="item_mas_group in mas_group">{{ item_mas_group }}</option>
  </select>
  <select @input="timetable" v-if="timetabletype == 'room'">
    <option v-for="item_mas_room in mas_room">{{ item_mas_room }}</option>

  </select>
  <select @input="timetable" v-if="timetabletype == 'teacher'">
    <option v-for="item_mas_teacherstaff in mas_teacherstaff">{{ item_mas_teacherstaff }}</option>

  </select>
  <div class="calendar">
    <CalendarPicker ref="dates" @select="handleDate" />
  </div>
  <button @click="timetable" style="width: 100px;height: 50px;"></button>
    <table v-if="qweresult && qweresult.value && qweresult.value.length > 0" border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>№ пары</th>
          <th>Время</th>
          <th>Дисциплина</th>
          <th>Преподаватель</th>
          <th>Аудитория</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lesson in qweresult.value[0]?.timeTable" :key="lesson.lessonNumber">{{ console.log(lesson) }}
          {{ console.log(fetch('') ) }}
          <td>{{ lesson.LessonNumber }}</td>
          <td>{{ formatTimeRange(lesson.startTime, lesson.endTime) }}</td>
          <td>{{ lesson.timeTable || '—' }}</td>
          <td>{{ lesson.timeTable  || '—' }}</td>
          <td>{{ lesson.timeTable || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<style module>
.calendar {
  margin: 50px 0;
}
</style>