import React from 'react';
import { FlexPlugin } from 'flex-plugin';

import CustomDirectory from './components/CustomDirectory';

const PLUGIN_NAME = 'CustomDirectoryPlugin';

export default class CustomDirectoryPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.WorkerDirectory.Tabs.Content.add(
      <flex.Tab
        key="custom-directory"
        label="Directory"
      >
        <CustomDirectory />
      </flex.Tab>
    );
  }
}
