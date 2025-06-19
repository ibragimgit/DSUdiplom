<template>
  <div class="timeline-wrapper">
    <header class="main-header">
      <h1>{{ $t('chrono.title') }}</h1>
      <p>{{ $t('chrono.text') }}</p>
    </header>

    <div
      ref="timelineContainer"
      id="timeline-container"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <svg ref="svgContainer" id="timeline-svg" :viewBox="viewBox" preserveAspectRatio="none">
        <path
          ref="svgPath"
          id="timeline-path"
          :d="pathD"
          fill="none"
          stroke="#2a3b5c"
          :stroke-width="strokeWidth"
        />
      </svg>

      <div id="balls-container">
        <div
          v-for="ball in balls"
          :key="ball.id"
          class="ball"
          :class="{ active: activeBallId === ball.id }"
          :style="{ transform: `translate(${ball.x - ballSize / 2}px, ${ball.y - ballSize / 2}px)`, width: `${ballSize}px`, height: `${ballSize}px`, fontSize: `${ballFontSize}px` }"
        >
          {{ ball.data.year }}
        </div>
      </div>

      <Transition name="fade">
        <div v-if="showCard" id="info-card">
          <div class="card-header">
            <button @click="navigate(-1)">←</button>
            <h3>{{ activeBallData.year }}</h3>
            <button @click="navigate(1)">→</button>
          </div>
          <div class="image-wrapper">
            <img :src="activeBallData.image" alt="Event image" class="image-underlay" />
            <div class="scales-overlay">
              <div
                v-for="n in 100"
                :key="n"
                class="scale-tile"
                :style="{ animationDelay: getTileDelay(n) + 'ms' }"
              ></div>
            </div>
          </div>
          <p>{{ $t(activeBallData.text) }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
});

const timelineContainer = ref(null);
const svgContainer = ref(null);
const svgPath = ref(null);

const balls = ref([]);
const activeBallId = ref(null);
const showCard = ref(false);
const isDragging = ref(false);
const dragStartX = ref(0);
const startOffset = ref(0);
const currentOffset = ref(0);
const pathLength = ref(0);
const ballSize = ref(50);
const ballFontSize = ref(14);

let animationFrame = null;
let showCardTimer = null;

// Responsive SVG viewBox and path
const viewBox = computed(() => {
  const width = window.innerWidth <= 640 ? 1000 : 2000;
  return `0 0 ${width} 300`;
});

const pathD = computed(() => {
  const width = window.innerWidth <= 640 ? 1000 : 2000;
  const step = width / 4;
  return `M -${step / 2},150 C ${step / 2},50 ${step},250 ${step * 1.5},150 S ${step * 2.5},50 ${step * 3},150 S ${step * 3.5},250 ${step * 4},150 S ${step * 4.5},50 ${step * 5},150`;
});

const strokeWidth = computed(() => {
  return window.innerWidth <= 640 ? 1 : 2;
});

// Update responsive sizes
const updateResponsiveSizes = () => {
  const width = window.innerWidth;
  if (width <= 640) {
    ballSize.value = 40;
    ballFontSize.value = 12;
  } else if (width <= 1023) {
    ballSize.value = 45;
    ballFontSize.value = 13;
  } else {
    ballSize.value = 50;
    ballFontSize.value = 14;
  }
  updateBallsPositions();
};

const getTileDelay = (n) => {
  const cols = 10;
  const row = Math.floor((n - 1) / cols);
  const col = (n - 1) % cols;
  return (row + col) * 40;
};

const createBalls = () => {
  balls.value = props.data.map((item, index) => {
    const initialPositionOnPath = (pathLength.value * (index + 1)) / (props.data.length + 1);
    return {
      id: index,
      data: item,
      initialPosition: initialPositionOnPath,
      x: 0,
      y: 0,
    };
  });
};

const updateBallsPositions = () => {
  if (!timelineContainer.value || !svgPath.value) return;
  const containerRect = timelineContainer.value.getBoundingClientRect();
  const svgViewBox = svgContainer.value.viewBox.baseVal;

  balls.value.forEach((ball) => {
    const positionOnPath = ball.initialPosition + currentOffset.value;
    const point = svgPath.value.getPointAtLength(
      Math.max(0, Math.min(pathLength.value, positionOnPath)),
    );
    ball.x = (point.x / svgViewBox.width) * containerRect.width;
    ball.y = (point.y / svgViewBox.height) * containerRect.height;
  });

  const centerX = containerRect.width / 2;
  let closestBall = null;
  let minDistance = Infinity;

  balls.value.forEach((ball) => {
    const distance = Math.abs(ball.x - centerX);
    if (distance < minDistance) {
      minDistance = distance;
      closestBall = ball;
    }
  });

  if (closestBall) {
    activeBallId.value = closestBall.id;
  }
};

const showCardWithDelay = (delay = 220) => {
  clearTimeout(showCardTimer);
  showCardTimer = setTimeout(() => {
    showCard.value = true;
  }, delay);
};

const animateToNearestBall = () => {
  const containerRect = timelineContainer.value.getBoundingClientRect();
  const centerX = containerRect.width / 2;

  let closestBall = null;
  let minDistance = Infinity;

  balls.value.forEach((ball) => {
    const distance = Math.abs(ball.x - centerX);
    if (distance < minDistance) {
      minDistance = distance;
      closestBall = ball;
    }
  });

  if (closestBall) {
    const offsetNeeded = centerX - closestBall.x;
    animateOffset(currentOffset.value + offsetNeeded * 2.5, () => {
      showCardWithDelay();
    });
  }
};

const startDrag = (event) => {
  isDragging.value = true;
  showCard.value = false;
  clearTimeout(showCardTimer);
  dragStartX.value = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
  startOffset.value = currentOffset.value;
  timelineContainer.value.style.cursor = 'grabbing';
  cancelAnimationFrame(animationFrame);
};

const onDrag = (event) => {
  if (!isDragging.value) return;
  event.preventDefault();

  const currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
  const dx = currentX - dragStartX.value;
  const dragSensitivity = window.innerWidth <= 640 ? 1.5 : 1.2;
  currentOffset.value = startOffset.value + dx * dragSensitivity;

  const minOffset = -pathLength.value * 0.4;
  const maxOffset = pathLength.value * 0.4;
  currentOffset.value = Math.max(minOffset, Math.min(maxOffset, currentOffset.value));

  updateBallsPositions();
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  timelineContainer.value.style.cursor = 'grab';
  animateToNearestBall();
};

const activeBallData = computed(() => {
  if (activeBallId.value === null) return null;
  const active = balls.value.find((b) => b.id === activeBallId.value);
  return active ? active.data : null;
});

const navigate = (direction) => {
  showCard.value = false;
  clearTimeout(showCardTimer);

  let targetId = (activeBallId.value ?? 0) + direction;
  if (targetId >= props.data.length) targetId = 0;
  if (targetId < 0) targetId = props.data.length - 1;

  const targetBall = balls.value.find((b) => b.id === targetId);
  const containerRect = timelineContainer.value.getBoundingClientRect();
  const centerX = containerRect.width / 2;

  if (targetBall) {
    const requiredOffset = centerX - targetBall.x;
    animateOffset(currentOffset.value + requiredOffset * 2.5, () => {
      showCardWithDelay();
    });
  }
};

const animateOffset = (targetOffset, onComplete) => {
  const start = currentOffset.value;
  const change = targetOffset - start;
  const duration = 1000;
  let startTime = null;

  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const t = Math.min(1, timeElapsed / duration);
    const easeOut = t * (2 - t);

    currentOffset.value = start + change * easeOut;
    updateBallsPositions();

    if (t < 1) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      currentOffset.value = targetOffset;
      updateBallsPositions();
      if (onComplete) onComplete();
    }
  }

  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  nextTick(() => {
    pathLength.value = svgPath.value.getTotalLength();
    createBalls();
    updateResponsiveSizes();
    updateBallsPositions();
    animateToNearestBall();
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('resize', updateResponsiveSizes);
  });
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
  window.removeEventListener('resize', updateResponsiveSizes);
  clearTimeout(showCardTimer);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.timeline-wrapper {
  margin: 0;
  padding: clamp(1.5rem, 4vw, 2.5rem) 0;
  background: #fff;
  color: #2a3b5c;
  font-family: 'Montserrat', sans-serif;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.main-header {
  text-align: center;
  padding: 0 clamp(0.75rem, 2vw, 1.25rem) clamp(0.75rem, 2vw, 1.25rem);
}

.main-header h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  text-transform: uppercase;
  color: #2a3b5c;
  margin: 0;
}

.main-header p {
  max-width: clamp(25rem, 50vw, 37.5rem);
  margin: 0.75rem auto;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: 1.5;
  color: #6b7280;
}

#timeline-container {
  position: relative;
  width: 100%;
  height: clamp(30vh, 50vw, 50vh);
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  cursor: grab;
  user-select: none;
}

#timeline-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

#balls-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ball {
  position: absolute;
  top: 0;
  left: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1f2937;
  font-weight: 600;
  z-index: 5;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.06);
}

.ball:hover {
  background: #f1f5f9;
}

.ball.active {
  background: #2a3b5c;
  color: #ffffff;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
}

#info-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  max-width: clamp(14rem, 30vw, 17.5rem);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(1rem);
  border-radius: 0.375rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.06);
  padding: clamp(0.75rem, 2vw, 1.5rem) clamp(0.5rem, 1.5vw, 1rem);
  text-align: center;
  pointer-events: all;
  transition: box-shadow 0.3s ease;
  min-height: clamp(18.75rem, 50vw, 21.875rem);
}

#info-card:hover {
  box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: clamp(0.9375rem, 2.5vw, 1.125rem);
  font-weight: 700;
  color: #1f2937;
  text-transform: uppercase;
  margin: 0;
}

.card-header button {
  background: none;
  border: none;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #2a3b5c;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.card-header button:hover {
  color: #1f2c40;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: clamp(6.25rem, 20vw, 10.625rem);
  overflow: hidden;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
}

.image-underlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.scales-overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.scale-tile {
  background: #ffffff;
  animation: tileFade 0.6s ease-out forwards;
}

#info-card p {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  line-height: 1.5;
  color: #4b5563;
  margin: 0;
  opacity: 0;
  transform: translateY(0.625rem);
  animation: fadeTextUp 0.6s ease 0.4s forwards;
}

/* Animations */
@keyframes tileFade {
  from {
    opacity: 1;
    transform: scale(1.2);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes fadeTextUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}

/* Media Queries for Responsiveness */
@media (max-width: 640px) {
  .timeline-wrapper {
    padding: clamp(1rem, 3vw, 1.5rem) 0;
  }

  .main-header h1 {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
  }

  .main-header p {
    font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  }

  #timeline-container {
    height: clamp(25vh, 40vw, 30vh);
  }

  #info-card {
    max-width: clamp(12rem, 80vw, 13.75rem);
    min-height: clamp(16.25rem, 45vw, 18.75rem);
    padding: clamp(0.625rem, 2vw, 1rem) clamp(0.5rem, 1.5vw, 0.75rem);
  }

  .image-wrapper {
    height: clamp(5rem, 18vw, 7.5rem);
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .timeline-wrapper {
    padding: clamp(1.25rem, 3.5vw, 2rem) 0;
  }

  #timeline-container {
    height: clamp(30vh, 45vw, 40vh);
  }

  #info-card {
    max-width: clamp(13rem, 40vw, 15rem);
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  #info-card {
    max-width: clamp(15rem, 35vw, 16.25rem);
  }
}
</style>