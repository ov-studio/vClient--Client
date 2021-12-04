/*----------------------------------------------------------------
     Resource: vClient (Server)
     Script: store: groups: personal.js
     Author: vStudio
     Developer(s): Aviril, Mario, Tron
     DOC: 23/11/2021
     Desc: Store -- Personal Groups
----------------------------------------------------------------*/


/*-----------
-- Imports --
-----------*/

import vue from "vue"
import * as importedJS from "@/assets/import"


/*------------------
-- Store Handlers --
------------------*/

export const state = () => ({
  personalGroups: {} 
})

export const actions = {
  onClientActionInput(state, payload) {
    return importedJS.Library.Socket.getSocket("app").socket.emit("App:Group:Personal:onClientActionInput", payload)
  }
}

export const mutations = {
  onSyncGroups(state, groupData) {
    const groupUID = groupData.groupUID
    if (!state.personalGroups[groupUID]) {
      delete groupData.groupUID 
      vue.set(state.personalGroups, groupUID, groupData)
    }
    (groupData.groupMessages).forEach(async function(messageData) {
      console.log(messageData)
      let lastArrayRef = state.personalGroups[groupUID].groupMessages[(state.personalGroups[groupUID].groupMessages.length - 1)]
      if (!lastArrayRef || (messageData.ownerUID != lastArrayRef.ownerUID)) {
        vue.set(state.personalGroups[groupUID].groupMessages, state.personalGroups[groupUID].groupMessages.length, {
          ownerUID: messageData.ownerUID,
          ownerMessages: {}
        })
      }
      lastArrayRef = state.personalGroups[groupUID].groupMessages[(state.personalGroups[groupUID].groupMessages.length - 1)]
      vue.set(lastArrayRef.ownerMessages, messageData.messageUID, {timestamp: messageData.timestamp, message: messageData.message})
    })
  }
}


/*-------------------
-- Store Utilities --
-------------------*/

addEventListener(importedJS.Generic.eventDatas.app.connection.name, function() {
  const appSocket = importedJS.Library.Socket.getSocket("app")
  appSocket.socket.on("App:onSyncPersonalGroups", function(groupData) {
    $nuxt.$store.commit("groups/personal/onSyncGroups", groupData)
  })
}, false)