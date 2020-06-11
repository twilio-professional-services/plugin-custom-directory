# Flex Custom Directory Plugin

This plugin implements a *Custom Transfers Directory* tab in the [Twilio Flex](https://www.twilio.com/flex) [Native Dialpad](https://www.twilio.com/docs/flex/dialpad). It includes code for [Twilio Functions](https://www.twilio.com/docs/runtime/functions) as well as frontend UI code in the form of a [Flex plugin](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin).

## Status

This project is currently **In-Progress**.

It is not intended to be used _as-is_, but may be used as sample code. Please refer to the TODO list for detailed status.

### TODO
- [X] Fork existing [Custom Directory Plugin](https://github.com/trogers-twilio/plugin-custom-directory/) sample code
- [X] Cleanup the sample code
- [X] Upgrade Flex to latest
- [X] Add Serverless structure
- [X] Implement & incorporate Function for pulling team members
  - [X] Modify all workers
  - [X] Build Function
  - [X] Incorporate function into the Directory Component
- [X] Incorporate Transfer functionality from the [Native Flex Dialpad Add-on
 Plugin](https://github.com/twilio-professional-services/flex-dialpad-addon-plugin)
  - [X] Refactor Transfer button structure (currently errors)
  - [X] Pull in Warm Transfers _note: Using Actions framework "TransferTask" rather than the addon strategy _
  - [X] Pull in Cold Transfers _note: Using Actions framework "TransferTask" rather than the addon strategy _
- [ ] Enhancements/Bugfixes
  - [X] Validate Twilio Signature
  - [X] Sort workers alphabetically
  - [X] Tab to front
  - [X] "Directory" --> "Team"
- [ ] Test
  - [ ] Unmodified workers
  - [ ] Invalid Signature
  - [ ] Function errors
  - [ ] Transfer failures
- [ ] Flesh out the README
  - [ ] Demo
    - [ ] Media Branch
    - [ ] Recording
  - [ ] Setup/Configuration
