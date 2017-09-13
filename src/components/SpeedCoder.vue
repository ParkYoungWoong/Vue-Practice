<template>
  <div>
    <div class="speed-coder-area">
      <div class="text-data speed-coder">
        <speed-coder :text-array="textArray" :text-index="index"></speed-coder>
      </div>
      <textarea id="text-area" class="speed-coder" v-model="textAreaValue" @focus="whenTextAreaFocus" @blur="whenTextAreaBlur"></textarea>
    </div>

    <div class="score">
      Typing Speed: {{ speed }}<br/>
      Typing Accuracy: {{ accuracy }}%<br/>
      Typing Error: {{ typingError }}<br/>
      Word Length: {{ totalWords }}<br/>
      Total Typing: {{ totalTyping }}<br/>
      Total Correct Typing: {{ index }}<br/>
      Elapsed Time: {{ elapsedTime }} sec
    </div>
  </div>
</template>


<script>
  export default {
    name: 'speedCoder',
    data () {
      return {
//        text: 'Hello world!\ngood job!\nHave a nice day!',
        text: `animateToOverview: function(animationType) {
for (let w = 0; w < this._workspaces.length; w++) {
if (animationType == AnimationType.ZOOM)
this._workspaces[w].zoomToOverview();
else
this._workspaces[w].fadeToOverview();
}
this._updateWorkspaceActors(false);},`,
        index: 0,
        textAreaValue: '',
        typingError: 0,
        totalTyping: 0,
        startTime: 0,
        elapsedTime: 0
      }
    },
    computed: {
      textArray () {
        return this.text.split('')
      },
      totalWords () {
        return this.textArray.length
      },
      speed () {
        return (this.index * 60 / this.elapsedTime)
      },
      accuracy () {
        return ((this.totalWords - this.typingError) * 100 / this.totalWords).toFixed(2)
      }
    },
    watch: {
      textAreaValue (newVal, oldVal) {
        this.checkValue(newVal, oldVal)
      }
    },
    methods: {
      checkValue (newVal, oldVal) {
        this.index = newVal.length
        let inputCurrentText = newVal.slice(-1)
        let dataCurrentText = this.textArray[this.index - 1]
        if (inputCurrentText === dataCurrentText) {
          if (oldVal > newVal) return  // 오타 이중 체크 방지
          this.whenCorrect()
        } else {
          if (newVal === '') return  // 첫 단어 이중 체크 방지
          this.whenIncorrect()
        }
      },
      whenCorrect () {
        console.log('Correct~')
        this.done()
        this.complete()
      },
      whenIncorrect () {
        console.log('Incorrect!!')
        this.typingError++
        this.done()
        this.stopInput()
      },
      done () {
        this.totalTyping++
      },
      complete () {
        if (this.totalWords === this.index) {
          console.log('Complete!!')
          this.textAreaValue = ''
          this.triggerTextAreaBlur()
        }
      },
      stopInput () {
        this.textAreaValue = this.textAreaValue.slice(0, -1)
        document.querySelector('.word.active').classList.add('dangerous')
      },
      whenTextAreaFocus () {
        console.log('focus!!')
        document.querySelector('.speed-coder-area').classList.add('active')
        this.startTime = new Date().getTime()
        this.computedElapsedTime()
      },
      whenTextAreaBlur () {
        console.log('blur!!')
        document.querySelector('.speed-coder-area').classList.remove('active')
      },
      triggerTextAreaBlur () {
        document.getElementById('text-area').blur()
      },
      computedElapsedTime () {
        setInterval(() => {
          this.elapsedTime = Math.round((new Date().getTime() - this.startTime) / 1000)
        }, 1000)
      }
    },
    components: {
      'speed-coder': {
        props: ['text-array', 'text-index'],
        template: '<div>' +
          '<span v-for="(text, index) in textArray">' +
            '<each-text :text="text" :index="index" :text-index="textIndex"></each-text>' +
          '</span>' +
        '</div>',
        components: {
          'each-text': {
            props: ['text', 'index', 'text-index'],
            computed: {
              isActive: function () {
                return this.index === this.textIndex
              },
              isEnter: function () {
                if (this.text === '\n') return true
              }
            },
            template: '<span class="word" :class="{ active: isActive, enter: isEnter }">' +
              '{{ text }}<br v-if="isEnter" />' +
            '</span>'
          }
        }
      }
    }
  }
</script>


<style lang="scss">
  @import '../../node_modules/reset-css/reset.css';
  @import '../../node_modules/animate.css/animate.min.css';

  .speed-coder-area {
    width: 500px;
    height: 300px;
    margin: 20px;
    border: 1px solid darkgrey;
    position: relative;

    &.active {
      border-color: tomato;
    }

    .speed-coder {
      font-family: monospace;
      font-size: 16px;
      line-height: 1;
      letter-spacing: 0;
      padding: 10px;
      border: none;
      outline: none;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      @at-root #{selector-unify(&, textarea)} {
        /*color: transparent;*/
        color: tomato;
        background: transparent;
      }

      .word {
        outline: 1px solid transparent;

        &.active {
          color: white;
          background: orange;
          outline-color: red;

          &.enter {
            background: royalblue;
            outline-color: blue;
            position: relative;
            padding-left: 9px;
            /*"\21B5"*/

            &::before {
              content: "\21B5";
              position: absolute;
              top: 4px;
              left: 1px;
            }
          }
          &.dangerous {
            background: red;
            outline-color: brown;
          }
        }
      }
    }
  }

  .score {

  }
</style>
