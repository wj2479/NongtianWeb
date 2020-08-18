<template>
  <div id="chartColumn" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { mapGetters } from "vuex";
import echarts from "echarts";
import { getprojectinfo } from "@/api/project";
import { getAreaList } from "@/api/user";

export default {
  name: "Dashboard",
  data() {
    return {
      chartColumn: null,
      userid: -1,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    this.userid = user.id;
    this.getProjectInfo();
  },

  mounted() {},

  methods: {
    getProjectInfo() {
      getprojectinfo(this.userid).then((res) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
