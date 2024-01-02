import themes from 'devextreme/ui/themes';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import DevExpress from 'devextreme/bundles/dx.all';

import { AppModule } from './app/app.module';

themes.initialized(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});

DevExpress.config({
  editorStylingMode: 'outlined'
})

DevExpress.ui.dxTextBox.defaultOptions({ 
  options: {
      stylingMode: "outlined"
  }
});
