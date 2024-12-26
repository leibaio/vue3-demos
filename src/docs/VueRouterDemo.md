在 Vue Router 中，你可以通过几种方式在使用 `this.$router` 进行导航时添加参数。以下是几种常用的方法：
路由参数（Path Parameters）:
this.$router.push({ name: 'routeName', params: { id: 123 } })

这会生成类似 `/user/123` 的 URL。
查询参数（Query Parameters）:
this.$router.push({ path: '/search', query: { keyword: 'vue' } })

这会生成类似 `/search?keyword=vue` 的 URL。
混合使用：
this.$router.push({
  name: 'user',
  params: { userId: 123 },
  query: { plan: 'private' }
})

这可能会生成类似 `/user/123?plan=private` 的 URL。
使用字符串路径并添加查询参数：
this.$router.push('/search?keyword=vue')

或者
this.$router.push(`/user/${userId}?plan=private`)

使用 `replace` 而不是 `push`（这不会创建新的历史记录）：
this.$router.replace({ path: '/home', query: { alert: 'true' } })

在你的具体场景中，如果你想在返回到 step 2 时传递一些参数，你可以这样修改：
methods: {
  goBack() {
    const savedState = sessionStorage.getItem('CFLCreationState');
    if (savedState) {
      // 导航回创建页面，并添加一个查询参数
      this.$router.push({
        path: '/create-cfl',
        query: { returnedFromPreview: 'true' }
      });
    } else {
      this.$router.back();
    }
  }
}

然后在 CreaterCfl 组件中，你可以检查这个参数：
created() {
  if (this.$route.query.returnedFromPreview) {
    // 从预览页面返回
    const savedState = sessionStorage.getItem('CFLCreationState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.step = state.step;
      this.submitData = state.submitData;
      // 恢复其他需要的状态

      // 清除保存的状态
      sessionStorage.removeItem('CFLCreationState');
    }
  }
}

这种方法允许你在返回到 step 2 时传递额外的信息，同时保持 URL 的清晰和可读性。根据你的具体需求，你可以选择最适合的方法来传递必要的参数。