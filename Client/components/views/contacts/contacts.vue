<!---------------------------------------------------------------
     Resource: vCommunity-Client
     Script: components: views: contacts.vue
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: View -- Contacts
----------------------------------------------------------------->


<!------------
-- Template --
------------->

<template>
  <div class="position-relative w-100 min-w-100 max-w-100 d-flex flex-column align-items-center overflow-hidden disable-selection view-contacts-container">
    <div class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-row align-self-start hide-scroller navigation-container">
      <div v-for="(navigationData, navigationIndex) in navigations" :key="navigationIndex" :navigationIndex="navigationIndex" :isSelected="selectedNavigation == navigationIndex" class="navigation" @click.prevent="onClientChangeNavigation(navigationIndex)">{{navigationIndex}} {{onClientGetNavigationLength(navigationIndex)}}</div>
    </div>

    <div v-if="isFriendFinder" class="w-100 h-100 min-w-100 min-h-100 max-w-100 max-h-100 d-flex flex-column align-self-start align-items-center justify-content-center overflow-hidden friends-finder-container">
      <div class="finder-header">{{finderDatas.headers[finderDatas.currentHeader]}}</div>
      <input class="finder-control" placeholder="Enter Username" v-model="finderDatas.username" autocomplete="off" spellcheck="false">
      <div class="finder-action" @click.prevent="onClientProcessInvitation">
        <div class="form-button-text">Invite</div>
      </div>
    </div>
    <div v-else class="w-100 min-w-100 max-w-100 d-flex flex-column align-self-start align-items-center justify-content-start hide-scroller contacts-container">
      <widget-contactbar v-for="(contactData, contactUID) in contactDatas.contacts" :key="contactUID" :contactUID="contactUID" contactAvatar="https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg" :contactOptions="contactDatas.options" :contactOptionHandler="onClientProcessOption"/>
    </div>
  </div>
</template>


<!----------------
-- Dependencies --
----------------->

<script src="./script.js"/>
<style scoped lang="sass" src="./style.sass"/>