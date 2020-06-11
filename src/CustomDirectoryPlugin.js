import React from 'react';
import { FlexPlugin } from 'flex-plugin';
import PluginConfig from './config'


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
        label="Team"
      >
        <CustomDirectory
          runtimeDomain   = { PluginConfig.runtimeDomain }
          getToken        = { () => manager.store.getState().flex.session.ssoTokenPayload.token }
          teamLeadSid     = { manager.workerClient.attributes.team_lead_sid || manager.workerClient.sid }
          skipWorkerIf    = { (worker) => worker.sid === manager.workerClient.sid }
          invokeTransfer  = { (params) => { flex.Actions.invokeAction("TransferTask", params); flex.Actions.invokeAction("HideDirectory")} }
        />
      </flex.Tab>
    , {
      sortOrder: -1
    });
  }
}
