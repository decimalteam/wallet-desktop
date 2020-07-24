<template>
  <div
    v-if="msg"
    class="fixed-overlay fixed-overlay__modal"
    @click.self="close(0)"
  >
    <div
      class="confirm-wrap"
    >
      <div
        class="confirm"
        :class="{'success': msg.mode === 'success',
                 'error': msg.mode === 'error',
                 'confirmation': msg.mode === 'confirm',
                 'confirm--closed': isClose}"
      >
        <div
          class="confirm__head"
        >
          {{ msg.title }}
        </div>
        <div class="confirm__body">
          <div
            v-if="msg.mode === 'confirm'"
            class="content-confirm"
          >
            <div class="check">
              {{ msg.text }}
            </div>
            <div class="params">
              <div
                v-for="(item , i) in msg.params"
                :key="i"
                class="param"
              >
                <div class="param__label">
                  {{ item.label }}
                </div>
                <div class="param__value">
                  {{ item.value || '-' }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="msg.mode === 'success'"
            class="content-success"
          >
            <p
              v-if="msg.text"
              class="success-text"
            >
              {{ msg.text }}
            </p>
            <p v-if="msg.hash">
              Transaction hash:
            </p>
            <a
              v-if="msg.hash"
              :href="`http://explorer.decimalchain.com/transactions/${msg.hash}`"
              target="_blank"
              rel="noopener noreferrer"
            >{{ msg.hash }}</a>
          </div>
          <div
            v-else-if="msg.mode === 'error'"
            class="content-error"
          >
            <p v-html="msg.text" />
          </div>
          <div>
            <div
              v-if="msg.mode === 'confirm'"
              class="confirm__btns"
            >
              <button
                class="btn btn--cancel"
                @click="close(0)"
              >
                Canсel
              </button>
              <button
                class="btn btn--confirm"
                @click="close(1)"
              >
                Confirm
              </button>
            </div>
            <div
              v-else
              class="confirm__btns"
            >
              <button
                class="btn btn--ok"
                @click="close(0)"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./style.scss" lang="scss"></style>
<script src="./script.js"></script>
