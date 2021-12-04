export default {
  data() {
    return {
      selections: {
        serverGroup: false,
        personalGroup: false
      }
    }
  },

  mounted() {},

  computed: {
    personalGroups() {
      this.onClientChangeSelection("personalGroup", this.selections.personalGroup)
      return this.$store.state.groups.personal.personalGroups || false
    },

    viewHeader() {
      if (this.selections.serverGroup) {
        return ''
      } else if (this.selections.personalGroup) {
        return "@" + this.selections.personalGroup
      }
    },
  },

  methods: {
    getParticipantDatas(participantUID) {
      if (this.$store.state.views.contacts.userContacts["friends"] && this.$store.state.views.contacts.userContacts["friends"][participantUID]) {
        return this.$store.state.views.contacts.userContacts["friends"][participantUID]
      }
      return false
    },

    onClientChangeSelection(selectionType, selection) {
      if (selectionType == "personalGroup") {
        const initialGroup = Object.entries(this.$store.state.groups.personal.personalGroups)[0]
        this.selections.personalGroup = (selection && this.$store.state.groups.personal.personalGroups[selection]) || (initialGroup && initialGroup[0]) || false
      }
    },

    onClientActionInput(event) {
      if (event.keyCode == 13) {
        event.preventDefault()
        event.target.value = ""
        return false
      }
    }
  }
}