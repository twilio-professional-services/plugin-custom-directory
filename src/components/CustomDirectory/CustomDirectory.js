import * as React from "react";
import { Tab, templates } from '@twilio/flex-ui';
import {
  TabContainer, InputContainer, StyledInput, ItemContainer
} from './CustomDirectoryComponents';
import DirectoryItem from './DirectoryItem';

const directoryEntries = [
  {
    id: '12345',
    name: 'Field User 1'
  }, {
    id: '56789',
    name: 'Field User 2'
  }
];

export class CustomDirectory extends React.Component {
  onTransferClick = item => payload => {
    console.log('Transfer clicked');
    console.log('Transfer item:', item);
    console.log('Transfer payload:', payload);
  }
  render() {
    return (
      <TabContainer key="custom-directory-container">
        <InputContainer key="custom-directory-input-container">
          <StyledInput
            key="custom-directory-input-field"
            placeholder={templates.WorkerDirectorySearchPlaceholder()}
          />
        </InputContainer>
        <ItemContainer
          key="custom-directory-item-container"
          className="Twilio-WorkerDirectory-Workers"
          vertical
        >
          {console.warn('Directory entries:', directoryEntries)}
          {directoryEntries.map(item => {
            console.warn('Directory item:', item);
            return (
              <DirectoryItem
                item={item}
                key={item.id}
                onTransferClick={this.onTransferClick(item)}
              />
            );
          })}
        </ItemContainer>
      </TabContainer>
    )
  }
}
