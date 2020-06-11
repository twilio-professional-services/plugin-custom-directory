import * as React from "react";
import Url from 'url'
import Axios from 'axios';

import { templates, withTaskContext } from '@twilio/flex-ui';

import DirectoryItem from './DirectoryItem';
import {
  TabContainer, InputContainer, StyledInput, ItemContainer
} from './CustomDirectoryComponents';

class CustomDirectory extends React.Component {
  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.getDirectoryEntries();
  }

  async getDirectoryEntries() {
    // Build out the config blocks for Axios
    let axiosBody = {
      teamLeadSid: this.props.teamLeadSid,
    };
    let axiosOptions = {
      headers: {
        'X-Twilio-Signature': this.props.getToken(),
        'Content-Type': 'application/json',
      }
    };
    let url = Url.resolve(this.props.runtimeDomain, 'getTeamMembers');
    // let url = this.props.runtimeDomain;

    // Make it happen!
    let { data } = await Axios.post(url, axiosBody, axiosOptions);
    if (data && data.success && data.payload) {
      this.setState({
        directoryEntries: data.payload.workers || []
      })
    } else {
      console.error("COULD NOT LOAD WORKERS.", data)
    }

  }

  filteredDirectory() {
    if (!this.state.directoryEntries) {
      return []
    }
    const { searchTerm } = this.state;
    return this.state.directoryEntries.filter(entry => {
      if (this.props.skipWorkerIf && this.props.skipWorkerIf(entry)) {
        return false;
      }
      if (!searchTerm) {
        return true;
      }
      return entry.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

  onSearchInputChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onTransferClick(worker, options) {
    console.log('Transfer clicked');
    console.log('Transfer worker:', worker);
    console.log('Transfer options:', options);
    this.props.invokeTransfer({
      task: this.props.task,
      options: options,
      targetSid: worker.sid
    })
  }

  render() {
    if (!this.state.directoryEntries) {
      return <div />
    }
    return (
      <TabContainer key="custom-directory-container">
        <InputContainer key="custom-directory-input-container">
          <StyledInput
            key="custom-directory-input-field"
            onChange={this.onSearchInputChange}
            placeholder={templates.WorkerDirectorySearchPlaceholder()}
          />
        </InputContainer>
        <ItemContainer
          key="custom-directory-item-container"
          className="Twilio-WorkerDirectory-Workers"
          vertical
        >
          {console.warn('Directory entries:', this.filteredDirectory())}
          {this.filteredDirectory().map(item => {
            return (
              <DirectoryItem
                item={item}
                key={item.sid}
                onTransferClick={this.onTransferClick.bind(this)}
              />
            );
          })}
        </ItemContainer>
      </TabContainer>
    )
  }
}

export default withTaskContext(CustomDirectory);
