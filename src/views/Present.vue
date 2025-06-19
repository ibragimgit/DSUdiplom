<template>
  <div>
    <input type="file" @change="handleFileSelect" multiple accept=".pdf,.pptx,.odp" />

    <div v-if="currentPresentation">
      <h2>{{ currentPresentation.title }}</h2>
      <!-- Здесь твой компонент для отображения слайдов, использующий currentPresentation.slides -->
      <PresentationView :slides-data="currentPresentation.slides" />
    </div>
    
    <div v-if="allProcessedPresentations.length > 0">
        <h3>Обработанные презентации:</h3>
        <ul>
            <li v-for="pres in allProcessedPresentations" :key="pres.id" @click="selectPresentation(pres)">
                {{ pres.title }} ({{ pres.slides.length }} слайдов)
            </li>
        </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import PresentationView from './PresentationView.vue'; // Твой компонент для показа слайдов

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const allProcessedPresentations = ref([]);
const currentPresentation = ref(null);

async function processPdfFile(fileObject) {
  // ... (код из примера выше)
  // ...
  // return { id: ..., title: ..., slides: ...};
  const arrayBuffer = await fileObject.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const slides = [];
  const presentationTitleBase = fileObject.name.replace(/\.[^/.]+$/, "");

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    // Простой способ собрать текст. Для лучшего форматирования может потребоваться более сложная логика.
    const pageText = textContent.items.map(item => item.str).join(' ').trim();
    slides.push({
      title: `${presentationTitleBase} - Слайд ${i}`,
      content: pageText || 'Содержимое не извлечено или страница пуста'
    });
  }
  return {
    id: presentationTitleBase.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now(), // уникальный ID
    title: presentationTitleBase,
    description: `Презентация ${fileObject.name}, обработана в браузере`,
    file: null, 
    slides: slides
  };
}

// Заглушки для PPTX/ODP, так как их парсинг сложен
async function processPptxFile(fileObject) {
  console.warn("Парсинг PPTX в браузере сложен и здесь не реализован.");
  const presentationTitleBase = fileObject.name.replace(/\.[^/.]+$/, "");
  return {
    id: presentationTitleBase.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now(),
    title: presentationTitleBase,
    description: `Презентация ${fileObject.name} (PPTX - заглушка)`,
    file: null,
    slides: [{ title: "Слайд 1 (PPTX)", content: "Содержимое из PPTX (заглушка)" }]
  };
}

async function processOdpFile(fileObject) {
  console.warn("Парсинг ODP в браузере сложен и здесь не реализован.");
  const presentationTitleBase = fileObject.name.replace(/\.[^/.]+$/, "");
  return {
    id: presentationTitleBase.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now(),
    title: presentationTitleBase,
    description: `Презентация ${fileObject.name} (ODP - заглушка)`,
    file: null,
    slides: [{ title: "Слайд 1 (ODP)", content: "Содержимое из ODP (заглушка)" }]
  };
}


const handleFileSelect = async (event) => {
  const files = event.target.files;
  if (!files) return;

  // Можно сбрасывать предыдущие или добавлять к существующим
  allProcessedPresentations.value = []; 
  currentPresentation.value = null;

  for (const file of files) {
    let processedData = null;
    try {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        processedData = await processPdfFile(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || file.name.toLowerCase().endsWith('.pptx')) {
        processedData = await processPptxFile(file); // Используем заглушку
      } else if (file.type === 'application/vnd.oasis.opendocument.presentation' || file.name.toLowerCase().endsWith('.odp')) {
        processedData = await processOdpFile(file); // Используем заглушку
      } else {
        console.warn(`Неподдерживаемый тип файла: ${file.name} (${file.type})`);
      }

      if (processedData) {
        allProcessedPresentations.value.push(processedData);
      }
    } catch (error) {
        console.error(`Ошибка обработки файла ${file.name}:`, error);
        allProcessedPresentations.value.push({
            id: file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-').toLowerCase() + '-error-' + Date.now(),
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: `Ошибка обработки ${file.name}`,
            file: null,
            slides: [{title: 'Ошибка', content: `Не удалось обработать файл: ${error.message}`}]
        });
    }
  }
  // Опционально выбрать первую обработанную презентацию для отображения
  if (allProcessedPresentations.value.length > 0) {
    selectPresentation(allProcessedPresentations.value[0]);
  }
};

const selectPresentation = (presentation) => {
    currentPresentation.value = presentation;
}

</script>