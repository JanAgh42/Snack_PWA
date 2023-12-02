import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';

export default boot(({ app }) => {
  const store = createPinia();

  app.use(store);
});
