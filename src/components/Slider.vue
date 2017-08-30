<template>
  <div class="test-page">
    <ul class="btns">
      <li v-for="(img, index) in images" @click="slider(index)">
        {{ index }}
      </li>
    </ul>

    <div class="controls">
      <div class="prev" @click="prevSlider">PREV</div>
      <div class="next" @click="nextSlider">NEXT</div>
    </div>

    <transition-group tag="ul"
                      class="slider"
                      name="fade"
                      enter-active-class="animated fadeIn image-animation-duration-active"
                      leave-active-class="animated fadeOut image-animation-duration-leave"
                      @before-enter="beforeEnter"
                      @after-enter="afterEnter"
                      :duration="{ enter: duration.active, leave: duration.active }">
      <li v-for="(img, key) in images" :key="key" v-show="img.show">
        <img :src="require('../assets/' + img.src)" alt="">
      </li>
    </transition-group>
  </div>
</template>


<script>
  export default {
    name: 'testPage',
    data () {
      return {
        btnSelector: '.btns li',
        btnActiveSelector: 'active',
        currentIndex: -1,
        images: [
          { src: 'slider-image1.jpg', show: false },
          { src: 'slider-image2.jpg', show: false },
          { src: 'slider-image3.jpg', show: false },
          { src: 'slider-image4.jpg', show: false }
        ],
        duration: {
          active: 1000,
          leave: 1000
        },
        sliderLock: false,
        imageLength: 0
      }
    },
    methods: {
      slider (index) {
        if (this.sliderLock) return

        for (let i in this.images) {
          this.images[i].show = parseInt(i) === index
        }
        this.currentIndex = index
      },
      updatePager (index) {
        const btnList = document.querySelectorAll(this.btnSelector)
        for (let i in btnList) {
          if (parseInt(i) === index) btnList[i].classList.add(this.btnActiveSelector)
          else btnList[i].classList.remove(this.btnActiveSelector)
        }
      },
      prevSlider () {
        if (this.sliderLock) return
        if (this.currentIndex === 0) this.currentIndex = this.imageLength
        else this.currentIndex--
      },
      nextSlider () {
        if (this.sliderLock) return
        if (this.currentIndex >= this.imageLength) this.currentIndex = 0
        else this.currentIndex++
      },
      beforeEnter () {
        this.sliderLock = true
      },
      afterEnter () {
        this.sliderLock = false
      }
    },
    watch: {
      currentIndex (val) {
        console.log(val)
        this.slider(val)
        this.updatePager(val)
      }
    },
    created () {
      this.currentIndex = 0
      this.slider(this.currentIndex)
      this.imageLength = this.images.length - 1
    }
  }
</script>


<style lang="scss" scoped>
  @import '../../node_modules/reset-css/reset.css';
  @import '../../node_modules/animate.css/animate.min.css';

  .test-page {
    img {
      vertical-align: top;
    }
    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
    .btn {
      cursor: pointer;
      list-style: none;
      padding: 10px 14px;
      background: tomato;
      color: white;
      margin: 2px;
      text-align: center;
    }

    .btns {
      li {
        @extend .btn;
        display: inline-block;

        &.active {
          background: royalblue;
        }
      }
    }

    .controls {
      @extend .clearfix;

      .prev,
      .next {
        @extend .btn;
        float: left;
      }
    }

    .slider {
      position: relative;

      li {
        position: absolute;
        list-style: none;
      }
    }

    .image-animation-duration-active {
      animation-duration: 1s;
    }
    .image-animation-duration-active {
      animation-duration: 1s;
    }
  }
</style>
