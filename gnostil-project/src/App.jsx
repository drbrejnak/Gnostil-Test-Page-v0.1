import './App.css'
import Modify from '../Maneuver_Properties/Modify'
import Light from '../Maneuver_Properties/Light'
import Honorable from '../Maneuver_Properties/Honorable'
import Combat from '../Maneuver_Properties/Combat'
import Narrative from '../Maneuver_Properties/Narrative'
import Infamous from '../Maneuver_Properties/Infamous'
import Heavy from '../Maneuver_Properties/Heavy'
import Attack from '../Maneuver_Properties/Attack'
import Rings from '../Maneuver_Properties/Rings'

function App() {

  return (
    <>
    <div className='container'>
      <Rings />
      <Combat />
      {/* <Narrative /> */}
      <Honorable />
      {/* <Infamous /> */}
      {/* <Light /> */}
      <Heavy />
      {/* <Modify /> */}
      <Attack />
    </div>
    </>
  )
}

export default App
