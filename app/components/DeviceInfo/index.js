import React from 'react'
import Device from 'react-device'
 
const DeviceInfo = (props) => {
  const onChange = (deviceInfo) => {
    console.log('Screen height', deviceInfo.screen.height)
    console.log('Screen width', deviceInfo.screen.width)
    console.log('Screen orientation', deviceInfo.screen.orientation)
    console.log('Browser name', deviceInfo.browser.name)
    console.log('Os', deviceInfo.os.name)
}
 
  return <Device onChange={onChange} />
}
 
export default DeviceInfo